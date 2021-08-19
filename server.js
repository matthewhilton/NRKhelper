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
    return sentence_strings;
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

// Translate and POS tag subtitles
router.get('/context', async (ctx, next) => {
    const programid = ctx.request.query.programid


    if(programid) {
        const sentence_strings = await get_subtitles_from_programid(programid);

        const all_text = sentence_strings.join('');

        const analysis = await axios.post("http://localhost:9000", {
            sentence: all_text
        })

        ctx.body = analysis.data;
        return;
    }

    ctx.body = "";
})

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);


/*
router.get('/programid', (ctx, next) => {
    console.log(ctx.body)
    ctx.body = "Nope";
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)

const programid = 'KMTE62005921';
const subtitleurl = `http://psapi-granitt-prod-we.cloudapp.net/programs/${programid}/subtitles/tt`

const apikey = process.env.TRANSLATE_API_KEY;

// Spawn analyser server - server responds to GET requests


/*
setTimeout(() => {
    (async () => {
        const response = await fetch(subtitleurl)
        const body = await response.text()
    
        const sentence_strings = ttml_to_text(body);
        
        const analysis_res = await fetch('http://localhost:9000', { 
            method: 'post', 
            body: JSON.stringify({
                "sentence": sentence_strings[1],
            }),
            headers: {'Content-Type': 'application/json'}
        })

        const analysis = await analysis_res.json()

        console.log(analysis)
    })()
}, 1500)*/

//extract_program_id('https://tv.nrk.no/serie/mobilfloert/sesong/1/episode/1/avspiller');

/*
translate_from_no("hei alle sammen", process.env.TRANSLATE_API_KEY).then(data => {
    console.log(data)
})
*/