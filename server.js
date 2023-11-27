require('dotenv').config();

const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

const initializePassport = require('./src/middleware/passport');

const uri = process.env.URI;
const secretKey = process.env.SECRET_KEY;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connect:'));
db.once('open', () => {
    console.log('Connected To Databases!');
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.json());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

initializePassport(passport);

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
const cryptoMainRouter = require('./src/routes/crypto');
const accountRouter = require('./src/routes/account');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/crypto', cryptoMainRouter);

const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => console.log('Server Running At PORT 4000'));