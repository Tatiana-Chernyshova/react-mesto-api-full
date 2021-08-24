export const BASE_URL = 'https://api.mrld.nomoredomains.rocks/';

class Api {
  constructor({ address, headers }) {
    // тело конструктора
    this._address = address;
    this._headers = headers;
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers})
    .then(this._checkResponse)
  }

  createCards(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  setUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse)
  }

  editUserAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
    .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return fetch(`${this._address}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this._address}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse)
    }

  }
    
  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

}

const api = new Api({
  address: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

export default api;
