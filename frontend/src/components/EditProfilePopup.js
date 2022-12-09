import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
  header,
  bttnText,
  isOpen,
  onClose,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name || name);
    setAbout(currentUser?.about || about);
  }, [currentUser]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({ name, about });
  }

  function handleOnClose() {
    onClose();
    setTimeout(() => {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }, 200);
  }

  return (
    <PopupWithForm
      header={header}
      onSubmit={handleSubmit}
      buttonText={bttnText}
      isOpen={isOpen}
      onClose={handleOnClose}
      formName="profile"
    >
      <input
        onChange={({ target }) => setName(target.value)}
        value={name}
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Введите имя профиля..."
        minLength="2"
        maxLength="20"
        required
      />
      <span className="popup__error popup__error_type_name"></span>
      <input
        onChange={({ target }) => setAbout(target.value)}
        value={about}
        className="popup__input popup__input_type_about"
        type="text"
        name="about"
        placeholder="О себе..."
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error popup__error_type_about"></span>
    </PopupWithForm>
  );
}
