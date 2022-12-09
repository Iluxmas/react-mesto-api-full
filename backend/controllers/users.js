const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Error401 = require('../errors/error401');
const Error404 = require('../errors/error404');
const Error409 = require('../errors/error409');
const { StatusCodes } = require('../utils/StatusCodes');

function createUser(req, res, next) {
  const {
    password, email, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then(() => {
      res.send({
        data: {
          email, name, about, avatar,
        },
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new Error409('Пользователь с такой почтой уже зарегестрирован'));
      }
      next(error);
    });
}

function getUser(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) next(new Error404('Пользователь не найден'));
      return res.send({ data: user });
    })
    .catch(next);
}

function getMyInfo(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) next(new Error404('Пользователь не найден'));
      return res.status(StatusCodes.OK).send(user);
    })
    .catch(next);
}

function getAllUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function updateUser(req, res, next) {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true })
    .then((user) => {
      if (!user) next(new Error404('Пользователя с указанным id не найдено'));
      res.send({ data: user });
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, req.body, { new: true })
    .then((user) => {
      if (!user) next(new Error404('Пользователя с указанным id не найдено'));
      res.send({ data: user });
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) next(new Error401('Неправильные почта или пароль'));

      bcrypt.compare(password, user.password, (error, data) => {
        if (error) next(new Error401('Неправильные почта или пароль'));

        if (data) {
          const token = jwt.sign({ _id: user._id }, 'iddqd_idkfa', { expiresIn: '7d' });
          res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
          return res.status(StatusCodes.OK).send({ message: 'Access granted' });
        }

        return next(new Error401('Неправильные почта или пароль'));
      });
    })
    .catch(next);
}

module.exports = {
  createUser,
  getUser,
  getMyInfo,
  getAllUsers,
  updateUser,
  updateAvatar,
  login,
};
