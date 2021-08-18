import { translate_from_no } from './src/translator.js';
import { ttml_to_text } from './src/ttml.js'
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config()

const programid = 'KMTE62005921';
const subtitleurl = `http://psapi-granitt-prod-we.cloudapp.net/programs/${programid}/subtitles/tt`


fetch(subtitleurl)
    .then(res => res.text())
    .then(body => {
        console.log(ttml_to_text(body));
    });
    
/*
translate_from_no("hei alle sammen", process.env.TRANSLATE_API_KEY).then(data => {
    console.log(data)
})
*/