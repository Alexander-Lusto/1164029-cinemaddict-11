import Movie from './models/movie.js';

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }
  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          return [];
        }
        throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
      })
      .then(Movie.parseMovies);
  }

  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
      .then((response) => response.json());
  }

  updateFilms(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers,
    })
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }
}

