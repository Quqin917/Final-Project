const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userMaps');


function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                return done(null, false, { message: 'No User With This Email' });
            }

            if (user.activeSessionID && user.activeSessionID !== user.id) {
                passport.sessionManager.logOut(user.activeSessionID);
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return done(null, false, { message: 'Incorrect Password' })
            }

            user.activeSessionID = user.id;
            await user.save();

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }; 

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        User.findById(id).then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        })
    });
};

module.exports = initialize;