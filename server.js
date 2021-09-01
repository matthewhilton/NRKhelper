import dotenv from 'dotenv';
import childprocess from "child_process";
import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import serve from "koa-static";
import mount from "koa-mount";
import axios from 'axios';
import {ttml_to_text} from './src/ttml.js';
import {extract_program_data} from "./src/extract_data.js"
import { translate_from_no } from './src/translator.js';
import bodyParser from 'koa-bodyparser'
import nlp from 'node-nlp';

dotenv.config()

const app = new Koa();
const router = new Router();


childprocess.spawn('python', ['./src/analyser_server.py']);

// Convert NRK Video URL to Program ID (used in other API's)
router.get('/programid', async (ctx, next) => {
    const nrkurl = ctx.request.query.url

    if(nrkurl) {
        const data = await extract_program_data(nrkurl);
        ctx.body = data;
        return;
    }

    ctx.body = "";
})

const get_subtitles_from_programid = async (programid) => {
    const subtitleurl = `http://psapi-granitt-prod-we.cloudapp.net/programs/${programid}/subtitles/tt`;
    const response = await axios.get(subtitleurl)
    const sentence_strings = ttml_to_text(String(response.data));
    const sentences_filtered = sentence_strings.filter(item => item !== "undefined" ? item : null)
    return sentences_filtered;
}

let subtitle_cache = {};
let translation_cache = {};

const cache_subtitles_analysis = async (programid) => {

    if(subtitle_cache[programid] !== undefined) {
        console.log(`${programid} subtitles are cached`);
        return;
    }

    console.log(`Program ${programid} has no subtitles cached`)

    const subtitles = await get_subtitles_from_programid(programid);
    const subtitle_sentence_analysis = [];

    for(const sentence of subtitles) {
        const analysis_req = await axios.post(process.env.ANALYSIS_SERVER_PATH, {
            sentence: sentence
        })
        const analysis = analysis_req.data;
        subtitle_sentence_analysis.push(analysis);
    }
    
    subtitle_cache[programid] = subtitle_sentence_analysis;
}

const cache_translation = async (text) => {
    if(translation_cache[text] !== undefined) {
        console.log(`${text} translation is cached`);
        return;
    }

    console.log(`${text} translation is not cached`);
    const translation_resp = await translate_from_no(text, process.env.TRANSLATE_API_KEY);
    const translation_eng = translation_resp[0]["translations"][0]["text"];
    translation_cache[text] = translation_eng;
}

// Get subtitles for a given Program ID
router.get('/subtitles', async (ctx, next) => {
    const programid = ctx.request.query.programid

    if(programid) {
        ctx.body = {
            "subtitles": await get_subtitles_from_programid(programid)
        }
        return;
    }

    ctx.body = "";
})

// Tokenise a sentence to get the POS
router.get('/tokenise', async (ctx, next) => {
    const sentencestring = ctx.request.query.sentence

    // Tokenise using python server
    const analysis = await axios.post(process.env.ANALYSIS_SERVER_PATH, {
        sentence: sentencestring
    })

    ctx.body = analysis.data;
})

// Get similar sentences using tokenisation data
router.get('/context', async (ctx, next) => {

    const word = ctx.request.query.word
    const programid = ctx.request.query.programid

    if(word == null || programid == null) {
        return;
    }

    await cache_subtitles_analysis(programid)
    const program_subtitle_analysis = subtitle_cache[programid]

    const word_analysis = await axios.post(process.env.ANALYSIS_SERVER_PATH, {
        sentence: word
    })

     // Now search through the subtitle analysis and find ones with the same lemma
    const desired_lemma = word_analysis.data.lemma[0]
    const sentence_with_matching_lemmas = program_subtitle_analysis.filter(analysis => analysis.lemma.includes(desired_lemma))

    // Also translate the word
    await cache_translation(word);
    const translation_eng = translation_cache[word]

    ctx.body = {
        translation: translation_eng,
        context: sentence_with_matching_lemmas,
        word_lemma: desired_lemma,
    }
})

router.post('/translate', async (ctx, next) => {
    const text = ctx.request.body.text

    if(!text) {
        return;
    }

    await cache_translation(text);
    const translation_eng = translation_cache[text]

    ctx.body = {
        translation: translation_eng,
    };
})

const static_pages = new Koa();
static_pages.use(serve("./src/frontend/nrkhelper-frontend/build"));

app.use(cors());
app.use(mount("/", static_pages));
app.use(bodyParser())
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000
console.log(`Server starting on port ${port}`)
app.listen(port);