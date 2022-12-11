const Card = require('../models/card');
const { StatusCodes } = require('../utils/StatusCodes');
const Error403 = require('../errors/error403');
const Error404 = require('../errors/error404');

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) next(new Error404('Передан несуществующий id карточки.'));
      if (card.owner.toString() !== req.user._id) next(new Error403('Только владелец может удалять свои карточки'));

      card.remove();
      return res.status(StatusCodes.OK).send({ message: 'Карточка была удалена' });
    })
    .catch(next);
}

function getAllCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

function likeCard(req, res, next) {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) next(new Error404('Передан несуществующий id карточки.'));
      res.send(card);
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return next(new Error404('Передан несуществующий id карточки.'));

      return res.status(200).send(card);
    })
    .catch(next);
}

module.exports = {
  createCard,
  deleteCard,
  getAllCards,
  likeCard,
  dislikeCard,
};
