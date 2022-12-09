import React from "react";

export default function InfoTooltip({ isOpen, isSuccess, onClose }) {
  const popupText = isSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз";
  const statusImageClass = isSuccess
    ? "popup__status-icon popup__status-icon_type_success"
    : "popup__status-icon popup__status-icon_type_fail";
  const popupClassName = isOpen ? "popup popup_opened" : "popup";

  return (
    <div className={popupClassName}>
      <div className="popup__container popup__container_infotooltip">
        <div className={statusImageClass}></div>
        <p className="popup__infotooltip-text">{popupText}</p>

        <button className="popup__close-button" onClick={onClose}>
          &#10005;
        </button>
      </div>
    </div>
  );
}
// onClick={onClose}
