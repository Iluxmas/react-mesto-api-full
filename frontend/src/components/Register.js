import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Register({ onRegister, isSuccess }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onRegister(email, password);
    if (isSuccess) {
      setPassword("");
      setEmail("");
    }
  }

  return (
    <section className="register">
      <h2 className="register__header">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input register__input_type_email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        ></input>
        <input
          className="register__input register__input_type_password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          minLength="4"
          required
        ></input>
        <button className="register__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__subtext">
        Уже зарегистрированы?&nbsp;
        <NavLink className="register__enter-link" to="/sign-in">
          Войти
        </NavLink>
      </p>
    </section>
  );
}
