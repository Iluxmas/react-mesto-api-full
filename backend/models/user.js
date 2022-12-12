const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя пользователя должно быть от 2 до 30 символов'],
    maxlength: [30, 'Имя пользователя должно быть от 2 до 30 символов'],
    default: 'Жак-Ив Кусто',
    required: false,
  },
  about: {
    type: String,
    minlength: [2, 'Описание пользователя должно быть от 2 до 30 символов'],
    maxlength: [30, 'Описание пользователя должно быть от 2 до 30 символов'],
    default: 'Исследователь',
    required: false,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректная ссылка на аватар пользователя',
    },
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Введен некорректный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
