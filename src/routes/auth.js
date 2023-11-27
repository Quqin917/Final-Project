const express = require('express');
const router = express.Router();
const passport = require('passport');

const initializePassport = require('../middleware/passport');
const bcrypt = require('bcrypt');

const auth = require('../middleware/authenticationMiddleware');

const User = require('../models/userMaps');

initializePassport(passport);


router.get('/login', auth.isNotAuthenticated, (req, res) => {
    res.render('users/login', { user: req.user } )
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));



router.get('/register', auth.isNotAuthenticated, (req, res) => {
    res.render('users/register', { user: req.user});
});

router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const exist = await User.findOne({ $or: [{username: username}, { email: email}] });

        if (exist){
            if (username === exist.username) {
                req.flash('error', 'Username Is Occupied');
                return res.redirect('/auth/register');
            } else if (email === exist.email){
                req.flash('error', 'Email Is Occupied');
                return res.redirect('/auth/register');
            }
        }

        const user = await User.create({
            username: username,
            email: email,
            password: hashPassword
        });

        console.log(`A New Users With ${user.username} Has Been Created`)

        res.redirect('/auth/login')
    } catch (e) {
        console.error('ERROR REGISTER: ' + e.message);
        res.status(500).send('Internal Server Error');
    };
});


router.get('/changePassword', (req, res) => {
    res.render('users/change', { user : req.user});
})

router.post('/changePassword', async (req, res) => {
    try {
        const {email, password, newPassword} = req.body;

        const user = await User.findOne({email: email})

        if (!user) {
            req.flash('error', 'Email Is Not Found');
            return res.redirect('/auth/changePassword');
        }

        const Oldpassword = await bcrypt.compare(password, user.password);

        if (Oldpassword) {
            req.flash('error', 'Password Is Already In Use');
            return res.redirect('/auth/changePassword');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        if (password === newPassword) {
            await User.findOneAndUpdate({email: email}, {password: hashPassword}, {
                new: true
            })
        } else {
            req.flash('error', 'Password Incorrect');
            return res.redirect('/auth/changePassword');
        }

        if (auth.isAuthenticated) {
            res.redirect('/');
        } else {
            res.redirect('/auth/login');
        }
    } catch (e) {
        console.error('ERROR CHANGE: ' + e.message);
        res.status(500).send('Internal Server Error');
    }
})


router.get('/logout', (req, res) => {
    req.logOut( function(err) {
        if (err) { return err};

        res.redirect('/');
    });
});

module.exports = router