const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя карточки должно быть от 2 до 30 символов'],
    maxlength: [30, 'Имя карточки должно быть от 2 до 30 символов'],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректная ссылка на фотографию',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
