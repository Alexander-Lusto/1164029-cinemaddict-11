import FilmsComponent from '../components/films.js';
import SortComponent from '../components/sort.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmDetailsComponent from '../components/film-details.js';
import FilmsListComponent from '..//components/films-list.js';
import FilmsListContainerComponent from '../components/films-list-container.js';
import NoFilmsComponent from '../components/no-films.js';
import MostCommentedFilmsListComponent from '../components/most-commented-films-list.js';
import TopRatedFilmsListComponent from '../components/top-rated-films-list.js';
import {RenderPosition, render, remove, removeChild, appendChild} from '../utils/render.js';
import {SortType, BODY} from "../const.js";

const Mode = {
  CLOSED: `closed`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    const ClosePopupOnEscPress = (evt) => {
      if (evt.keyCode === 27) {
        this._mode = Mode.CLOSED;
        removeChild(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, ClosePopupOnEscPress);
      }
    };

    const ShowPopupOnClick = () => {
      //this._mode = Mode.OPEN;
      appendChild(BODY, this._filmDetailsComponent);
      document.addEventListener(`keydown`, ClosePopupOnEscPress);
    };

    const ClosePopupOnClick = () => {
      this._mode = Mode.CLOSED;
      removeChild(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, ClosePopupOnEscPress);
    };

    this._filmCardComponent.setClickHandler(ShowPopupOnClick);
    this._filmDetailsComponent.setClickHandler(ClosePopupOnClick);

    this._filmCardComponent.setAddToWatchlistButtonHandler((evt) => {
      evt.preventDefault();

      const oldFilm = film;
      const newFilm = Object.assign({}, film, {isInWatchlist: !film.isInWatchlist});

      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmCardComponent.setAlreadyWatchedButtonHandler((evt) => {
      evt.preventDefault();

      const oldFilm = film;
      const newFilm = Object.assign({}, film, {isInHistory: !film.isInHistory});

      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmCardComponent.setAddToFavoriteButtonHandler((evt) => {
      evt.preventDefault();

      const oldFilm = film;
      const newFilm = Object.assign({}, film, {isInFavorites: !film.isInFavorites});

      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmDetailsComponent.setAddToWatchlistButtonHandler(() => {
      const oldFilm = film;
      const newFilm = Object.assign({}, film, {isInWatchlist: !film.isInWatchlist});

      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmDetailsComponent.setAlreadyWatchedButtonhandler(() => {
      const oldFilm = film;
      const newFilm = Object.assign({}, film, {isInHistory: !film.isInHistory});

      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmDetailsComponent.setAddToFavoriteButtonHandler(() => {
      const oldFilm = film;
      const newFilm = Object.assign({}, film, {isInFavorites: !film.isInFavorites});

      this._onDataChange(this, oldFilm, newFilm);
    });

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    console.log(this._films);
    if (this._mode !== Mode.CLOSED) {
      removeChild(this._filmDetailsComponent);
    }
  }
}
