const axios = require('axios').default;

interface IOptions {
    readonly params?: {
        base?: string,
        currencies?: string
    }
    readonly headers: {
        'X-RapidAPI-Key':  string | undefined,
        'X-RapidAPI-Host': string,
    },
}

const BASE_URL = 'https://currency-converter-pro1.p.rapidapi.com';

export const fetchFromAPI = async (url: string, currency?: string) => {

    const options: IOptions = {
    params: {
        base: currency,
        currencies: 'UAH'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
    }
};

    const { data } = await axios.get(`${BASE_URL}/${url}`, options)

    return data;
}