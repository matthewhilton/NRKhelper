import dotenv from 'dotenv';
import childprocess from "child_process";
import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import axios from 'axios';
import {ttml_to_text} from './src/ttml.js';

import {extract_program_id} from "./src/extract_id.js"

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

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);