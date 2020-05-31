import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import FilmDetailsСommentsComponent from '../components/film-details-comments.js';
import FilmDetailsControlsComponent from '../components/film-details-controls.js';
import MovieModel from '../models/movie.js';
import {RenderPosition, render, removeChild, appendChild, replace, remove} from '../utils/render.js';
import FilmDetailsNewCommentComponent from '../components/film-details-new-comment.js';
import {BODY} from '../const.js';

export const SHAKE_ANIMATION_TIMEOUT = 600;

const Mode = {
  CLOSED: `closed`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(film, container, onDataChange, onViewChange, onCommentsChange, api, commentsModel) {
    this._film = film;
    this._container = container;
    this._onCommentsChange = onCommentsChange;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._commentsModel = commentsModel;

    this._comments = null;
    this._mode = Mode.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsControlsComponent = null;
    this._filmDetailsCommentsComponent = null;
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentComponent(); // было так, чтобы при переренде сохранялась инфа
    this._newCommentContainer = null;

    this._сlosePopupOnEscPress = this._сlosePopupOnEscPress.bind(this);
    this._showPopupOnClick = this._showPopupOnClick.bind(this);
    this._closePopupOnClick = this._closePopupOnClick.bind(this);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    remove(this._filmDetailsNewCommentComponent);

    document.removeEventListener(`keydown`, this._сlosePopupOnEscPress);
  }

  _сlosePopupOnEscPress(evt) {
    if (evt.keyCode === 27) {
      this._onViewChange();

      this._mode = Mode.CLOSED;
    }
  }

  _showPopupOnClick() {
    this._onViewChange();

    this.renderCommentsSection();

    // отрисовать сам попап
    appendChild(BODY, this._filmDetailsComponent);

    // повесть обработчик
    document.addEventListener(`keydown`, this._сlosePopupOnEscPress);
    this._mode = Mode.OPEN;
  }

  _closePopupOnClick() {
    this._onViewChange();
    this._mode = Mode.CLOSED;
  }

  _closePopup() {
    this._filmDetailsNewCommentComponent.reset();
    removeChild(this._filmDetailsCommentsComponent);
    removeChild(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._сlosePopupOnEscPress);
    this._mode = Mode.CLOSED;
  }

  _renderFilmCard(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmCardComponent.setClickHandler(this._showPopupOnClick);

    this._filmCardComponent.setAddToWatchlistButtonHandler((evt) => {
      evt.preventDefault();

      const newFilm = MovieModel.clone(film);
      newFilm.isInWatchlist = !newFilm.isInWatchlist;

      this._onDataChange(this, film, newFilm);
    });

    this._filmCardComponent.setAlreadyWatchedButtonHandler((evt) => {
      evt.preventDefault();

      const newFilm = MovieModel.clone(film);
      newFilm.isInHistory = !newFilm.isInHistory;

      this._onDataChange(this, film, newFilm);
    });

    this._filmCardComponent.setAddToFavoriteButtonHandler((evt) => {
      evt.preventDefault();
      const newFilm = MovieModel.clone(film);
      newFilm.isInFavorites = !newFilm.isInFavorites;

      this._onDataChange(this, film, newFilm);
    });


    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderFilmDetails(film) {
    this._film = film;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._renderFilmDetailsControls(film);
    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._filmDetailsComponent.setClickHandler(this._closePopupOnClick);

    this._filmDetailsNewCommentComponent.setAddCommentHandler((comment) => { // получаем наш новый комментарий
      if (this._mode === Mode.OPEN) {
        this._onCommentsChange(this, null, comment, film);
      }
    });

    if (oldFilmDetailsComponent) {
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

      this._filmDetailsNewCommentComponent.rerender();
      appendChild(this._newCommentContainer, this._filmDetailsNewCommentComponent);
    }
  }

  _renderFilmDetailsControls(film) {
    if (this._filmDetailsControlsComponent) {
      remove(this._filmDetailsControlsComponent);
    }

    this._filmDetailsControlsComponent = new FilmDetailsControlsComponent(film);
    const container = this._filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
    appendChild(container, this._filmDetailsControlsComponent);

    this._filmDetailsControlsComponent.setAddToWatchlistButtonHandler((evt) => {
      evt.target.checked = evt.target.value;

      const newFilm = MovieModel.clone(film);
      newFilm.isInWatchlist = !newFilm.isInWatchlist;
      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsControlsComponent.setAlreadyWatchedButtonHandler((evt) => {
      evt.target.checked = evt.target.value;

      const newFilm = MovieModel.clone(film);
      newFilm.isInHistory = !newFilm.isInHistory;
      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsControlsComponent.setAddToFavoriteButtonHandler((evt) => {
      evt.target.checked = evt.target.value;

      const newFilm = MovieModel.clone(film);
      newFilm.isInFavorites = !newFilm.isInFavorites;
      this._onDataChange(this, film, newFilm);
    });

  }

  render(film) {
    this._renderFilmCard(film);
    this._renderFilmDetails(film);
  }

  rerender(film) {
    this._renderFilmCard(film);
    this._renderFilmDetailsControls(film);
  }

  renderCommentsSection() {
    // удалить предыдущие комментарии, если они есть
    if (this._filmDetailsCommentsComponent) {
      remove(this._filmDetailsCommentsComponent);
    }

    // получить комментарии с сервера
    this._api.getComments(this._film.id)
    .then((comments) => {
      this._commentsModel.setComments(comments);
      this._comments = this._commentsModel.getComments();
      this._filmDetailsCommentsComponent = new FilmDetailsСommentsComponent(this._comments);

      // отрисовать загруженные комментарии
      const bottomContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
      appendChild(bottomContainer, this._filmDetailsCommentsComponent);

      this._filmDetailsCommentsComponent.setDeleteButtonHandler((index) => {
        const deletedComment = this._comments[index];
        this._onCommentsChange(this, deletedComment, null, this._film);
      });

      // отрисовать добавление комментария
      const newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
      appendChild(newCommentContainer, this._filmDetailsNewCommentComponent);
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSED) {
      this._closePopup();
    }
  }

  shakeTextarea() {
    const textarea = this._filmDetailsNewCommentComponent.getElement().querySelector(`.film-details__comment-input`);
    textarea.disabled = false;
    textarea.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    textarea.style.border = `1px solid red`;

    setTimeout(() => {
      textarea.style.animation = ``;

    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeComment(commentId) {
    const index = this._comments.findIndex((it) => it.id === commentId);
    const commentsAll = this._filmDetailsCommentsComponent.getElement().querySelectorAll(`.film-details__comment`);
    const comment = commentsAll[index];
    comment.disabled = false;
    comment.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    comment.style.border = `1px solid red`;

    setTimeout(() => {
      comment.style.animation = ``;

    }, SHAKE_ANIMATION_TIMEOUT);
  }

  resetTextarea() {
    this._filmDetailsNewCommentComponent.reset();
  }
}
