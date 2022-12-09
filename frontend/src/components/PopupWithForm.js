import React from "react";

export default function PopupWithForm(props) {
  const { header, buttonText, formName, isOpen, onClose, onSubmit, children } =
    props;

  const popupClassName = isOpen
    ? `popup popup_${formName} popup_opened`
    : `popup`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <h2 className="popup__header">{header}</h2>
        <form
          action=""
          name={formName}
          className={`popup__form popup__form_${formName}`}
          noValidate
          onSubmit={onSubmit}
        >
          <>{children}</>
          <button className="popup__form-save" type="submit">
            {buttonText}
          </button>
        </form>
        <button className="popup__close-button" onClick={onClose}>
          &#10005;
        </button>
      </div>
    </div>
  );
}
