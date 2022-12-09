import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  header,
  bttnText,
  isOpen,
  onClose,
  onAddPlace,
}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({ title, link });
  }

  return (
    <PopupWithForm
      header={header}
      onSubmit={handleSubmit}
      buttonText={bttnText}
      isOpen={isOpen}
      onClose={onClose}
      formName="add-card"
    >
      <input
        className="popup__input popup__input_type_title"
        type="text"
        name="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error popup__error_type_title"></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        value={link}
        onChange={({ target }) => setLink(target.value)}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__error_type_link"></span>
    </PopupWithForm>
  );
}
