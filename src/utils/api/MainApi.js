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

  getSavedMovies() {
    return this._request(`${this._url}/movies`, {
      headers: this._headers
    })
  }
}

export const mainApi = new Api({
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});
