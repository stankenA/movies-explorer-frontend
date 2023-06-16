class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getCurrentUser() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    })
  }

  updateCurrentUser(name, email) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
  }

  getSavedMovies() {
    return this._request(`${this._url}/movies`, {
      headers: this._headers
    })
  }

  saveNewMovie(movieInfo) {
    return this._request(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movieInfo)
    })
  }

  deleteSavedMovie(movieId) {
    return this._request(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}

export const mainApi = new Api({
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  }
});
