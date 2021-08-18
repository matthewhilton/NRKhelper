import convert from 'xml-js';
import lodash from 'lodash';
const { map, join, flatten, trim } = lodash;

/**
 * Converts Timed Text Markup Language (TTML) subtitles to a string array
 */
export const ttml_to_text = (ttml) => {

    // Remove unnecessary <br /> tags
    const brregex = new RegExp('<br />', 'g');
    const ttmlcleaned = ttml.replace(brregex, ' ');

    // Parse and convert to JSON
    const ttmlconverted = convert.xml2json(ttmlcleaned);
    const ttmljson = JSON.parse(ttmlconverted);
    
    // Extract text elements from JSON
    const events = ttmljson['elements'][0]['elements'][1]['elements'][0]['elements'];
    const eventelements = map(events, 'elements')
    const elements = flatten(eventelements)
    
    const textlines = map(elements, 'text'); 
    const textlinescleaned = map(textlines, item => item.replace(/-/g, ""))

    return textlinescleaned;
}