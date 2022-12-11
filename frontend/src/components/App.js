import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import Header from "./Header";
import Register from "./Register";
import apiService from "../utils/api";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const history = useHistory();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (!isLogged) return;

    Promise.all([apiService.getProfileInfo(token), apiService.getInitialCards(token)])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData.reverse());
      })
      .catch((err) => console.log(err));
  }, [isLogged]);

  // root admin: qweqwe123@mail.ru  pass: qweqwe  // veri seifti :E

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiService
        .validate(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            setIsLogged(true);
            history.push("/");
            return data;
          } else return;
        })
        .catch((err) => console.log("Error: ", err));
    }
  }

  function handleLogin(email, password) {
    apiService
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setEmail(email);
          setIsLogged(true);
          history.push("/");
        }
      })
      .catch((err) => console.log("Error: ", err));
  }

  function handleRegister(email, password) {
    apiService
      .register(email, password)
      .then(() => {
        history.push("/sign-in");
        setIsRegisterSuccess(true);
      })
      .catch((err) => {
        setIsRegisterSuccess(false);
        console.log("Error: ", err);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    setIsLogged(false);
    setCurrentUser(null);
    setEmail("");
    setCards([]);
    history.push("/sign-in");
  }

  function openAvatarModal() {
    setIsEditAvatarPopupOpen(true);
  }

  function openProfileModal() {
    setIsEditProfilePopupOpen(true);
  }

  function openAddCardModal() {
    setIsAddCardPopupOpen(true);
  }

  function openImagePopup(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    apiService
      .toggleLike(card._id, isLiked, token)
      .then((newCard) =>
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    apiService
      .deleteCard(card._id, token)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(newData) {
    apiService
      .patchProfileData(newData, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(newUrl) {
    apiService
      .patchProfileAvatar(newUrl, token)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddCard(cardNewData) {
    apiService
      .postNewCard(cardNewData, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLogged={isLogged} onLogout={handleLogout} email={email} />
        <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
              isSuccess={isRegisterSuccess}
            />
          </Route>
          <ProtectedRoute
            path="/"
            cards={cards}
            isLogged={isLogged}
            component={Main}
            onCardLike={handleCardLike}
            onCardClick={openImagePopup}
            onAddCard={openAddCardModal}
            onEditAvatar={openAvatarModal}
            onCardDelete={handleCardDelete}
            onEditProfile={openProfileModal}
          />
          <Route path="*">
            {isLogged ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          header="Редактировать профиль"
          bttnText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          header="Обновить аватар"
          bttnText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          header="Новое место"
          bttnText="Создать"
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegisterSuccess}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
