if (process.env.NODE_ENV !== 'production')  {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');

const indexRouter = require('./routes/index.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));

const mongoose = require('mongoose', );
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected To MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
})

const db = mongoose.connection

app.listen(process.env.PORT || 3000)

app.use('/', indexRouter)