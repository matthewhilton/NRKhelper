import dotenv from 'dotenv';
import childprocess from "child_process";
import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import axios from 'axios';
import _ from 'lodash';
import {ttml_to_text} from './src/ttml.js';
import {extract_program_id} from "./src/extract_id.js"
import { translate_from_no } from './src/translator.js';

const { map } = _;

dotenv.config()

const app = new Koa();
const router = new Router();

//childprocess.spawn('python', ['./src/analyser_server.py']);

router.get('/', async (ctx, next) => {
    ctx.body = "It works!";
})

// Convert NRK Video URL to Program ID (used in other API's)
router.get('/programid', async (ctx, next) => {
    const nrkurl = ctx.request.query.url

    if(nrkurl) {
        const programid = await extract_program_id(nrkurl);
        ctx.body = { "programid": programid};
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
const cache_subtitles_analysis = async (programid) => {

    if(subtitle_cache[programid] !== undefined) {
        return;
    }

    console.log(`Program ${programid} has no subtitles cached`)

    const subtitles = await get_subtitles_from_programid(programid);
    const subtitle_sentence_analysis = [];

    for(const sentence of subtitles) {
        const analysis_req = await axios.post("http://localhost:9000", {
            sentence: sentence
        })
        const analysis = analysis_req.data;
        subtitle_sentence_analysis.push(analysis);
    }
    
    subtitle_cache[programid] = subtitle_sentence_analysis;
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
    const analysis = await axios.post("http://localhost:9000", {
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

    const word_analysis = await axios.post("http://localhost:9000", {
        sentence: word
    })

     // Now search through the subtitle analysis and find ones with the same lemma
    const desired_lemma = word_analysis.data.lemma[0]
    const sentence_with_matching_lemmas = program_subtitle_analysis.filter(analysis => analysis.lemma.includes(desired_lemma))

    // Also translate the word
    const translation_resp = await translate_from_no(word, process.env.TRANSLATE_API_KEY);
    const translation_eng = translation_resp[0]["translations"][0]["text"]

    ctx.body = {
        translation: translation_eng,
        context: sentence_with_matching_lemmas,
        word_lemma: desired_lemma,
    }
})

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);