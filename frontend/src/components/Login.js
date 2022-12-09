import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) return;
    onLogin(email, password);
    setPassword("");
    setEmail("");
  }

  return (
    <section className="login">
      <h2 className="login__header">Вход</h2>
      <form className="login__form" noValidate onSubmit={handleSubmit}>
        <input
          className="login__input login__input_type_email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        ></input>
        <input
          className="login__input login__input_type_password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        ></input>
        <button className="login__submit-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
