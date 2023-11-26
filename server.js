require('dotenv').config();

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');

const indexRouter = require('./routes/index.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));

app.use('/', require('./routes/index.js'))

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something Went Wrong"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running At ${PORT}`));

app.use('/', indexRouter)