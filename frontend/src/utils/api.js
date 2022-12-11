const errorMessages = {
  profileLoad: "Данные не грузятся... Сервер спит... А бэкендеры уже нет",
  inititalCards: "Данные не грузятся... Сервер спит... А бэкендеры уже нет",
  deleteCard:
    "Возникла проблема с удалением карточки, обновите страницу и повторите запрос",
  postCard: "Возникла проблема с добавлением фотографии",
  avatarUpdate:
    "Возникла проблема с обновлением картинки профиля, обновите страницу и повторите запрос",
  profileUpdate: "Не получилось обновить данные профиля...",
  toggleLike: "Возникла проблема с проставкой лайка",
  register: "Ошибка регистрации",
  authorize: "Ошибка авторизации",
  validate: "Токен не передан или передан не в том формате",
};

class ApiService {
  constructor(url, messages) {
    this._URLBase = url;
    this._errorMessages = messages;
  }

  _checkResponse(request, errText) {
    return request.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${errText} \nStatus: ${res.status}`);
    });
  }

  _getResource(url, token) {
    return fetch(`${this._URLBase}${url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  _patchResource(url, data, token) {
    return fetch(`${this._URLBase}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  getInitialCards(token) {
    return this._checkResponse(
      this._getResource("/cards", token),
      this._errorMessages.inititalCards
    );
  }

  getProfileInfo(token) {
    return this._checkResponse(
      this._getResource("/users/me", token),
      this._errorMessages.profileLoad
    );
  }

  patchProfileData(data, token) {
    return this._checkResponse(
      this._patchResource("/users/me", data, token),
      this._errorMessages.profileUpdate
    );
  }

  patchProfileAvatar(data, token) {
    return this._checkResponse(
      this._patchResource("/users/me/avatar", data, token),
      this._errorMessages.avatarUpdate
    );
  }

  postNewCard({ title: name, link }, token) {
    const newProm = fetch(`${this._URLBase}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, link }),
    });

    return this._checkResponse(newProm, this._errorMessages.postCard);
  }

  deleteCard(cardId, token) {
    const newProm = fetch(`${this._URLBase}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return this._checkResponse(newProm, this._errorMessages.deleteCard);
  }

  toggleLike(cardId, isLiked, token) {
    const newProm = fetch(`${this._URLBase}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return this._checkResponse(newProm, this._errorMessages.toggleLike);
  }


  register(email, password) {
    const newProm = fetch(`${this._URLBase}/signup`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email }),
    });

    return this._checkResponse(newProm, this._errorMessages.register);
  }

  authorize(email, password) {
    const newProm = fetch(`${this._URLBase}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email }),
    });

    return this._checkResponse(newProm, this._errorMessages.authorize);
  }

  validate(token) {
    const newProm = fetch(`${this._URLBase}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this._checkResponse(newProm, this._errorMessages.validate);
  }
}

const apiService = new ApiService(`https://api.bereal.nomoredomains.club`, errorMessages);

export default apiService;
