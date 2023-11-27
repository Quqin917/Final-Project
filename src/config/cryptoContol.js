const crypto = require('../models/cryptoMaps');

const { cryptoAPI, fetchAPI } = require('../middleware/cryptoMiddleware');

const {decimalToPercentage, formatNumber} = require('./helper');

async function getCryptoData(userID) {
    if (!cryptoAPI.apiData) {
        await fetchAPI();
    }

    const coins = await crypto.find({ userId: userID });

    const userCoins = coins.map(coin => {
        const matchedCrypto = cryptoAPI.apiData.find(apiCoin => coin.cryptoName === apiCoin.name);

        if (matchedCrypto) {

            return {
                name: coin.cryptoName,
                rank: matchedCrypto.rank,
                code: matchedCrypto.code,
                price: formatNumber(matchedCrypto.rate),
                volume: formatNumber(matchedCrypto.volume),
                volumeCrypto: (matchedCrypto.volume / matchedCrypto.rate).toFixed(3),
                cap: formatNumber(matchedCrypto.cap),
                allTimeHigh: formatNumber(matchedCrypto.allTimeHighUSD),
                png: matchedCrypto.webp64,
                supply: matchedCrypto.circulatingSupply,
                rawHour: matchedCrypto.delta.hour,
                rawDay: matchedCrypto.delta.day,
                hour: decimalToPercentage(matchedCrypto.delta.hour),
                day: decimalToPercentage(matchedCrypto.delta.day)
            };
        }
    }).filter(Boolean);

    return userCoins;
}


async function addingCrypto(coin, userID) {
    if (!cryptoAPI.apiData) { await fetchAPI() };
    
    const existing = await crypto.findOne({ userId: userID, cryptoName: coin });
    if (existing) {
        return null;
    }

    const selected = cryptoAPI.apiData.find(apiCoin => apiCoin.name === coin);
    if (selected) {
        
        await crypto.create({
            userId: userID,
            cryptoName: coin
        });
        return selected;
    }

    return null;
}

module.exports = {
    getCryptoData,
    addingCrypto
}