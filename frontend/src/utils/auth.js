export const BASE_URL = 'https://api.mrld.nomoredomains.rocks';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "password": password,
      "email": email})
  })
  .then(result => checkResponse(result));
};

export const login = (password, email, token) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'authorization': token,
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({password, email})
  })
  .then(result => checkResponse(result));
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
  .then(result => checkResponse(result));
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
