import { BASE_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL + endpoint}`, options).then(checkResponse)
}

export const register = (name, password, email) => {
  return request(`/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password, email })
  })
    .then((res) => {
      return res;
    })
};

export const authorize = (password, email) => {
  return request(`/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
};

export const checkToken = (token) => {
  return request(`/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(data => data)
}
