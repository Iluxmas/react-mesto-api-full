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
  login: 'Возникла проблема при логине',
  register: 'Возникла проблема при регистрации'
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

  _getResource(url) {
    return fetch(`${this._URLBase}${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  _patchResource(url, data) {
    return fetch(`${this._URLBase}${url}`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  getInitialCards() {
    return this._checkResponse(
      this._getResource("/cards"),
      this._errorMessages.inititalCards
    );
  }

  getProfileInfo() {
    return this._checkResponse(
      this._getResource("/users/me"),
      this._errorMessages.profileLoad
    );
  }

  patchProfileData(data) {
    return this._checkResponse(
      this._patchResource("/users/me", data),
      this._errorMessages.profileUpdate
    );
  }

  patchProfileAvatar(data) {
    return this._checkResponse(
      this._patchResource("/users/me/avatar", data),
      this._errorMessages.avatarUpdate
    );
  }

  postNewCard({ title: name, link }) {
    const newProm = fetch(`${this._URLBase}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    });

    return this._checkResponse(newProm, this._errorMessages.postCard);
  }

  deleteCard(cardId) {
    const newProm = fetch(`${this._URLBase}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
    });

    return this._checkResponse(newProm, this._errorMessages.deleteCard);
  }

  toggleLike(cardId, isLiked) {
    const newProm = fetch(`${this._URLBase}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: 'include',
    });

    return this._checkResponse(newProm, this._errorMessages.toggleLike);
  }

  register(password, email) {
    const newProm = fetch(`${this._URLBase}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    });
    return this._checkResponse(newProm, this._errorMessages.register);
  };

  login(password, email) {
    const newProm = fetch(`${this._URLBase}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    });
    return this._checkResponse(newProm, this._errorMessages.login);
  };
}

const apiService = new ApiService(`https://https://bereal.nomoredomains.club/`, errorMessages);

export default apiService;
