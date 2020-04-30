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
import {RenderPosition, render, remove, removeChild, appendChild, replace} from '../utils/render.js';
import FilmDetailsNewCommentComponent from '../components/film-details-new-comment.js';
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
    this._filmDetailsNewCommentComponent = null;
    this._newCommentContainer = null;

    this._сlosePopupOnEscPress = this._сlosePopupOnEscPress.bind(this);
    this._showPopupOnClick = this._showPopupOnClick.bind(this);
    this._closePopupOnClick = this._closePopupOnClick.bind(this);
  }

  _сlosePopupOnEscPress(evt) {
    if (evt.keyCode === 27) {
      this._onViewChange();

      console.log(this._mode);
    }
  }

  _showPopupOnClick() {
    this._onViewChange();
    this._mode = Mode.OPEN;

    const newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    appendChild(newCommentContainer, this._filmDetailsNewCommentComponent);
    appendChild(BODY, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._сlosePopupOnEscPress);

    console.log(this._mode);
  }

  _closePopupOnClick() {
    this._onViewChange();

    console.log(this._mode);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;


    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentComponent(film);

    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

    this._filmCardComponent.setClickHandler(this._showPopupOnClick);
    this._filmDetailsComponent.setClickHandler(this._closePopupOnClick);

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

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      appendChild(this._newCommentContainer, this._filmDetailsNewCommentComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _closePopup() {
    this._mode = Mode.CLOSED;
    this._filmDetailsNewCommentComponent.reset();
    removeChild(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._сlosePopupOnEscPress);

    console.log(this._mode);
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSED) {
      this._closePopup();
    }
  }
}
