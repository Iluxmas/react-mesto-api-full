const errorMessages = {
  register: "Ошибка регистрации",
  authorize: "Ошибка авторизации",
  validate: "Токен не передан или передан не в том формате",
};
class AuthService {
  constructor(messages) {
    this._URLBase = `https://auth.nomoreparties.co`;
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

  register(email, password) {
    const newProm = fetch(`${this._URLBase}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    return this._checkResponse(newProm, this._errorMessages.register);
  }

  authorize(email, password) {
    const newProm = fetch(`${this._URLBase}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    return this._checkResponse(newProm, this._errorMessages.authorize);
  }

  validate(token) {
    const newProm = fetch(`${this._URLBase}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this._checkResponse(newProm, this._errorMessages.validate);
  }
}

const authService = new AuthService(errorMessages);

export default authService;
