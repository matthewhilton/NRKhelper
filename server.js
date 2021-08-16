const fetch = require('node-fetch');
const parser = require('xml2json');
const { map, join } = require('lodash');

const programid = 'KMTE62005921';
const subtitleurl = `http://psapi-granitt-prod-we.cloudapp.net/programs/${programid}/subtitles/tt`

fetch(subtitleurl)
    .then(res => res.text())
    .then(body => {
        ttmlstrip(body);
    });


const ttmlstrip = (ttml) => {

    // Remove unnecessary <br /> tags
    const brregex = new RegExp('<br />', 'g');
    const ttmlcleaned = ttml.replace(brregex, ' ');

    // Parse and convert to JSON
    const ttmlparsed = parser.toJson(ttmlcleaned);
    const ttmljson = JSON.parse(ttmlparsed);

    // Extract speech events
    const events = ttmljson['tt']['body']['div']['p'];
    const speech = map(events, '$t')

    // Combine to form a single string
    const allspeech = join(speech, ' ')

    // Cleanup
    const hyphregexp = new RegExp('-', 'g');
    const allspeechcleaned = allspeech.replace(hyphregexp, '');

    console.log(allspeechcleaned);
}