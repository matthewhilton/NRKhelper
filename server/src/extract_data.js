import axios from 'axios';
import cheerio from 'cheerio';

export const extract_program_data = async (url) => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const programid = $('meta[property="nrk:program-id"]').attr('content');
    const name = $('.tv-series-hero__title')[0].firstChild.data;
    const heroimg = $('.tv-series-hero-series-image__image')[0].attribs.src;
    const episodetitle = $('.tv-series-episode-title')[0].firstChild.data;
    return {programid, name, heroimg, episodetitle};
}