/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');
const Error401 = require('../errors/error401');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'iddqd_idkfa');
  } catch (err) {
    next(new Error401('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
}

module.exports = auth;
