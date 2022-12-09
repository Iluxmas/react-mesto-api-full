import React from "react";

export default function ImagePopup({ card, onClose }) {
  const popupClassName = card ? "popup popup_card-zoom popup_opened" : "popup popup_card-zoom";

  return (
    <div className={popupClassName}>
      <div className="popup__image-container">
        <img className="popup__zoom-image" src={card?.link} alt="" />
        <h3 className="popup__image-caption">{card?.name}</h3>
        <button className="popup__close-button" onClick={onClose}>
          &#10005;
        </button>
      </div>
    </div>
  );
}
