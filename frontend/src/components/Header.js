import React, { useState, useEffect } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Logo from "../img/Logo_mesto.png";

export default function Header({ isLogged, email, onLogout }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setViewportWidth(window.innerWidth)
    );
  }, []);

  useEffect(() => {
    if (viewportWidth > 544) setIsNavbarOpen(false);
  }, [viewportWidth]);

  // and now here is no hardcode magic :E

  const headerClass = isNavbarOpen ? "header header_activated" : "header";

  const navbarClass = isNavbarOpen
    ? "header__navbar header__navbar_activated"
    : "header__navbar";

  const logoClass = isNavbarOpen
    ? "header__logo header__logo_activated"
    : "header__logo";

  const lineOneClass = isNavbarOpen
    ? "line line1 line1_activated"
    : "line line1";

  const lineTwoClass = isNavbarOpen
    ? "line line2 line2_activated"
    : "line line2";

  const lineThreeClass = isNavbarOpen
    ? "line line3 line3_activated"
    : "line line3";

  function handleClick() {
    setIsNavbarOpen(() => !isNavbarOpen);
  }

  return (
    <header className={headerClass}>
      <img className={logoClass} src={Logo} alt="Лого" />
      <Switch>
        {!isLogged && (
          <Route path="/sign-in">
            <NavLink className="header__link" to="/sign-up">
              Регистрация
            </NavLink>
          </Route>
        )}
        {!isLogged && (
          <Route path="/sign-up">
            <NavLink className="header__link" to="/sign-in">
              Войти
            </NavLink>
          </Route>
        )}
        <Route path="*">
          <div className="header__hamburger" onClick={handleClick}>
            <span className={lineOneClass}></span>
            <span className={lineTwoClass}></span>
            <span className={lineThreeClass}></span>
          </div>
          <div className={navbarClass}>
            <p className="header__navbar-email">{email}</p>
            <a className="header__navbar-logout" onClick={onLogout}>
              Выйти
            </a>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
