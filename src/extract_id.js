import axios from 'axios';
import cheerio from 'cheerio';

export const extract_program_id = async (url) => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const programid = $('meta[property="nrk:program-id"]').attr('content');
    return programid;
}