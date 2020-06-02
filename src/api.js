import Movie from './models/movie.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const Status = {
  OK: 200,
  ERROR: 300,
};

const checkStatus = (response) => {
  if (response.status >= Status.OK && response.status < Status.ERROR) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {

    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(filmId) {

    return this._load({url: `comments/${filmId}`})
      .then((response) => response.json());
  }

  createComment(filmId, comments) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comments),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then((response) => response.json());
  }

  updateFilms(id, data) {

    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  deleteСomment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
      headers: new Headers({'Content-Type': `application/json`}),
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

