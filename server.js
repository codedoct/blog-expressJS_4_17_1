/* eslint-disable no-console */
require('module-alias/register');
require('dotenv').config();
require('./db/conn');
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const apiV1Router = require('./routes/api/v1');

app.use(cors()); // cors

app.use(bodyParser.json({ limit: '50mb' })); // read data request
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // all public file

app.use('/api/v1', apiV1Router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((err, req, res, next) => {
    if (err && err.name === 'MulterError') {
        res.status(400).json({ status: "error", message: err.message });
    } else {
        next(err, req, res, next);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
