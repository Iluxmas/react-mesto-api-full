/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');
const Error401 = require('../errors/error401');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Error401('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
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
