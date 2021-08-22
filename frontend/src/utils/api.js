class Api {
  constructor({ address, token }) {
    // тело конструктора
    this._address = address;
    this._token = token;
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token,
      }})
    .then(this._checkResponse)
  }

  createCards(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse)
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse)
  }

  setUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
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
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
    .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
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
      headers: {
        authorization: this._token,
        // 'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return fetch(`${this._address}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this._address}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse)
    }

  }
  // changeLikeCardStatus(id, isLiked) {
  //   if(isLiked) {
  //     this._putLike(id);
  //   } else {
  //     this._deleteLike(id);
  //   }
  // }

  // putLike(id) {
  //   return fetch(`${this._address}/cards/likes/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //   .then(this._checkResponse)
  // }
  
  // deleteLike(id) {
  //   return fetch(`${this._address}/cards/likes/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //   .then(this._checkResponse)
  // }
  
  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

}

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '36ca9ef1-bd1d-492c-84aa-4de20805470a'
})

export default api;
