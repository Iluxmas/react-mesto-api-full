const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Patterns } = require('../utils/Patterns');
const {
  getUser,
  getAllUsers,
  updateUser,
  getMyInfo,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/me', getMyInfo);

userRouter.get('/', getAllUsers);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(Patterns.url),
  }),
}), updateAvatar);

module.exports = userRouter;
