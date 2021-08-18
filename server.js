import { translate_from_no } from './src/translator.js';
import { ttml_to_text } from './src/ttml.js'
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import childprocess from "child_process";
import WebSocket from 'ws';

dotenv.config()

const programid = 'KMTE62005921';
const subtitleurl = `http://psapi-granitt-prod-we.cloudapp.net/programs/${programid}/subtitles/tt`

const apikey = process.env.TRANSLATE_API_KEY;

// Spawn analyser server - server responses to GET requests
const python = childprocess.spawn('python', ['./src/analyser_server.py']);

// TODO find way to wait for python to begin

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
}, 1500)


    
/*
translate_from_no("hei alle sammen", process.env.TRANSLATE_API_KEY).then(data => {
    console.log(data)
})
*/