const axios = require('axios').default;

interface IOptions {
    readonly headers: {
        accept: string
    },
}

const BASE_URL = 'https://api.fastforex.io';

export const fetchFromAPI = async (url: string) => {

    const options: IOptions = {
        headers: {
            accept: 'application/json'
        }
    };

    const { data } = await axios.get(`${BASE_URL}/${url}`, options)

    return data;
}