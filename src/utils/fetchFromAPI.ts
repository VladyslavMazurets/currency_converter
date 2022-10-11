const axios = require('axios');

interface IOptions {
    readonly method: string,
    readonly headers: any

}
const BASE_URL = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com';

const options: IOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
};

export const fetchFromAPI = async (url: string) => {

    const { data } = await axios.get(`${BASE_URL}/${url}`, options)

    return data;
}