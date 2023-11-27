const fetch = require('node-fetch');

const cryptoAPI = {
    apiData: null
};

const uri = "https://api.livecoinwatch.com/coins/list";

async function fetchAPI() {
    if (!cryptoAPI.apiData) {
        try {
            const response = await fetch(uri, {
                method: "POST",
                headers: new Headers({
                    "content-type": "application/json",
                    "x-api-key": process.env.API_KEY,
                }),
                body: JSON.stringify({
                    "currency": "USD",
                    "sort": "rank",
                    "order": "ascending",
                    "offset": 0,
                    "meta": true
                }),
            });
            const data = await response.json();
            cryptoAPI.apiData = data;
            return data;
        } catch (er) {
            console.error('ERROR FETCH: ' + er.mesasage);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = {
    cryptoAPI,
    fetchAPI
}