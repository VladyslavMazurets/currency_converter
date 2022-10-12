const axios = require('axios');

const BASE_URL = 'https://api.exchangerate.host';

export const fetchFromAPI = async (url: string) => {

    const { data } = await axios.get(`${BASE_URL}/${url}`)

    return data;
}