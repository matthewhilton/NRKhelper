import axios from 'axios';

const translateapi = 'https://api.cognitive.microsofttranslator.com';

export const translate_from_no = async (text, translatekey) => {
    const response = await axios({
        baseURL: translateapi,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': translatekey,
            'Content-type': 'application/json'
        },
        params: {
            'api-version': '3.0',
            'from': 'no',
            'to': ['en']
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    })

    return response.data;
}