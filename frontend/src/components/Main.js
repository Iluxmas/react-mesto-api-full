import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddCard,
  onEditAvatar,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser?.avatar}
              alt="аватар пользователя"
            />
            <div className="profile__avatar-overlay">
              <button
                className="profile__avatar-edit"
                onClick={onEditAvatar}
              ></button>
            </div>
          </div>

          <div className="profile__details">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{currentUser?.about}</p>
          </div>
        </div>
        <button className="profile__add-card" onClick={onAddCard}>
          +
        </button>
      </section>

      <section className="gallery">
        <ul className="gallery__container">
          {cards.map((card) => (
            <Card
              element={card}
              key={card._id}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
