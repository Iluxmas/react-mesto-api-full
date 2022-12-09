import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  header,
  bttnText,
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      header={header}
      onSubmit={handleSubmit}
      buttonText={bttnText}
      isOpen={isOpen}
      onClose={onClose}
      formName="avatar"
    >
      <input
        className="popup__input popup__input_type_avatar"
        type="url"
        ref={avatarRef}
        name="avatar"
        placeholder="Ссылка на новое изображение профиля"
        required
      />
      <span className="popup__error popup__error_type_avatar"></span>
    </PopupWithForm>
  );
}
