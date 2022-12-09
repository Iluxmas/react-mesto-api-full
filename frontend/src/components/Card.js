import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  element,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { likes, name, link, owner } = element;

  const currentUser = useContext(CurrentUserContext);
  const isOwner = owner._id === currentUser._id;
  const isLiked = likes.some((person) => person._id === currentUser._id);

  const likeBttnClass = isLiked
    ? "card__like-button card__like-button_active"
    : "card__like-button";

  function openImageModal() {
    onCardClick(element);
  }
  function handlelLikeCLick() {
    onCardLike(element);
  }
  function handleDeleteClick() {
    onCardDelete(element);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={openImageModal}
      />
      <div className="card__info">
        <h3 className="card__title">{name}</h3>
        <div className="card__like-board">
          <button className={likeBttnClass} onClick={handlelLikeCLick}></button>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
      <button
        className="card__remove-button"
        style={{ display: isOwner ? "block" : "none" }}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
