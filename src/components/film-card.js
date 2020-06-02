import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const MAX_DESCRIPTION_LENGTH = 140;

const createFilmCardTemplate = (film) => {
  const {name, poster, description, rating, releaseDate, duration, genres, isInWatchlist, isInHistory, isInFavorites, comments} = film;

  const shortDesc = `${description.substr(0, MAX_DESCRIPTION_LENGTH - 1)}...`;

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${name}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(releaseDate).format(`YYYY`)}</span>
          <span class="film-card__duration">${moment.utc(moment.duration(duration, `minutes`).asMilliseconds()).format(`h[h] mm[m]`)}</span>
          <span class="film-card__genre">${genres[0] ? genres[0] : ``}</span>
        </p>
        <img src="${poster}" alt="${name}" class="film-card__poster">
        <p class="film-card__description">${description.length > MAX_DESCRIPTION_LENGTH ? shortDesc : description}</p>
        <a class="film-card__comments">${comments ? comments.length : `0`} comments</a>
        <form class="film-card__controls">
          <button
            class="film-card__controls-item button film-card__controls-item--add-to-watchlist
            ${isInWatchlist ? `film-card__controls-item--active` : ``}"
          >
            Add to watchlist
          </button>

          <button
            class="film-card__controls-item button film-card__controls-item--mark-as-watched
            ${isInHistory ? `film-card__controls-item--active` : ``}"
          >
            Mark as watched
          </button>

          <button
            class="film-card__controls-item button film-card__controls-item--favorite
            ${isInFavorites ? `film-card__controls-item--active` : ``}"
          >
            Mark as favorite
          </button>
        </form>
      </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._comments);
  }

  setClickHandler(callback) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, callback);
  }

  setAddToWatchlistButtonHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, callback);
  }

  setAlreadyWatchedButtonHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, callback);
  }

  setAddToFavoriteButtonHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, callback);
  }
}

