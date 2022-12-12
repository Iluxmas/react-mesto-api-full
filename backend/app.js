require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const Error404 = require('./errors/error404');
const { Patterns } = require('./utils/Patterns');
const { login, createUser } = require('./controllers/users');
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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(Patterns.url),
  }),
}), createUser);

app.use(auth);

app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.all('*', (req, res, next) => next(new Error404('Страницы по данному адресу не существует')));

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
