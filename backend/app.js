require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://bereal.nomoredomains.club',
    'https://bereal.nomoredomains.club',
    'http://api.bereal.nomoredomains.club',
    'https://api.bereal.nomoredomains.club',
    'https://iluxmas.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
