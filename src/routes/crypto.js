const express = require('express');
const router = express.Router();

const crypto = require('../models/cryptoMaps');

const auth = require('../middleware/authenticationMiddleware');
const { cryptoAPI, fetchAPI } = require('../middleware/cryptoMiddleware');

const cacheControl = require('../config/cryptoControl');


router.get('/', auth.isAuthenticatedToHome, async (req, res) => {
    try {

        if (!cryptoAPI.apiData) { await fetchAPI() };
        

        const userCoins = await cacheControl.getCryptoData(req.user._id);

        res.render('cryptoHome', { user: req.user._id, coins: userCoins});
    } catch (er) {
        console.error('ERROR HOMECRYPTO: ' + er.message);
        res.status(500).send('Internal Server Error');
    }
})


router.get('/addCrypto', auth.isAuthenticatedToHome, async (req, res) => {
    try {
        if (!cryptoAPI.apiData) { await fetchAPI() };

        if (cryptoAPI.apiData) {
            res.render('coin/addCrypto', { user: req.user._id, coins: cryptoAPI.apiData });
        } else {
            console.error('Invalid or missing data structure in cache.apiData');
            res.status(500).send('Internal Server Error');
        }
    } catch (err) {
        console.error('ERROR FETCH: ' + err.message);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/addCrypto', async (req, res) => {
    try {
        const id = req.user._id;
        const coin = req.body.crypto;

        if (!cryptoAPI.apiData) { await fetchAPI() };

        const added = await cacheControl.addingCrypto(coin, id);
        if (added === null) {
            req.flash('error', `${coin} Is Already Selected`);
            return res.redirect('/crypto/addCrypto');
        } else {
            res.redirect('/crypto');
        }

    } catch (err) {
        console.error('ERROR CRYPTOadd: ' + err.message)
        res.status(500).send('Internal Server Error');
    }
})


router.get('/deleteCrypto', auth.isAuthenticatedToHome, async (req, res) => {
    try {
        const coin = await crypto.find({ userId: req.user._id }).select('cryptoName');

        if (!coin) { 
            res.status(500).send('Internal Server Error') 
        };

        res.render('coin/deleteCrypto', { user: req.user._id, coins: coin });
    } catch (err) {
        console.error('ERROR DELETE: ' + err.message);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/deleteCrypto', async (req, res) => {
    try {
        const coinName = req.body.crypto;

        const cryptoDelete = await crypto.findOne({
            userId: req.user._id,
            cryptoName: coinName
        })

        if(!cryptoDelete) {
            res.status(404).send('Cryptocurrency not found or does not belong to the user.');
        }

        await crypto.deleteOne({
            userId: req.user._id,
            cryptoName: coinName
        })

        res.redirect('/crypto');
    } catch (err) {
        console.error('ERROR CRYPTOdelete: ' + err.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;