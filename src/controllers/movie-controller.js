import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import FilmDetailsСommentsComponent from '../components/film-details-comments.js';
import CommentsModel from '../models/comments.js';
import MovieModel from '../models/movie.js';
import {RenderPosition, render, removeChild, appendChild, replace, remove} from '../utils/render.js';
import FilmDetailsNewCommentComponent from '../components/film-details-new-comment.js';
import {BODY} from '../const.js';
import FilmDetailsComments from '../components/film-details-comments.js';

const cloneDeep = require(`lodash.clonedeep`);
const Mode = {
  CLOSED: `closed`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(film, container, onDataChange, onViewChange, onCommentsChange, api) {
    this._film = film;
    this._container = container;
    this._onCommentsChange = onCommentsChange;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._comments = null;
    this._mode = Mode.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsCommentsComponent = null;
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentComponent(); // было так, чтобы при переренде сохранялась инфа
    // this._filmDetailsNewCommentComponent = null;

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
      console.log(this._mode);
    }
  }

  _showPopupOnClick() {
    this._onViewChange();

    // получить комментарии с сервера
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._comments = comments;
        this._commentsModel = new CommentsModel();
        this._commentsModel.setComments(comments);
        this._filmDetailsCommentsComponent = new FilmDetailsСommentsComponent(this._commentsModel);

        // отрисовать загруженные комментарии
        const bottomContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
        appendChild(bottomContainer, this._filmDetailsCommentsComponent);

        // повесить обработчик удаления комментария
        this._filmDetailsCommentsComponent.setDeleteButtonHandler((index) => {
          const deletedComment = this._comments[index];
          this._onCommentsChange(this, deletedComment, null, this._film);
        });

        // отрисовать добавление комментария
        const newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
        appendChild(newCommentContainer, this._filmDetailsNewCommentComponent);
      });

    // отрисовать сам попап
    appendChild(BODY, this._filmDetailsComponent);

    // повесть обработчик
    document.addEventListener(`keydown`, this._сlosePopupOnEscPress);
    this._mode = Mode.OPEN;
    console.log(this._mode);
  }

  _closePopupOnClick() {
    this._onViewChange();
    this._mode = Mode.CLOSED;
    console.log(this._mode);
  }

  render(film) {
    console.log(this._mode);
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

    this._filmCardComponent.setClickHandler(this._showPopupOnClick);
    this._filmDetailsComponent.setClickHandler(this._closePopupOnClick);

    if (this._mode === Mode.OPEN) {
      // получить комментарии с сервера
      this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel = new CommentsModel();
        this._commentsModel.setComments(comments);
        this._filmDetailsCommentsComponent = new FilmDetailsСommentsComponent(this._commentsModel);

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

    this._filmDetailsComponent.setAddToWatchlistButtonHandler(() => {
      const newFilm = MovieModel.clone(film);
      newFilm.isInWatchlist = !newFilm.isInWatchlist;
      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsComponent.setAlreadyWatchedButtonHandler(() => {
      const newFilm = MovieModel.clone(film);
      newFilm.isInHistory = !newFilm.isInHistory;
      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsComponent.setAddToFavoriteButtonHandler(() => {
      const newFilm = MovieModel.clone(film);
      newFilm.isInFavorites = !newFilm.isInFavorites;
      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsNewCommentComponent.setAddCommentHandler((comment) => { // получаем наш новый комментарий
      if (this._mode === Mode.OPEN) {
        this._onCommentsChange(this, null, comment, film);
      }
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

      this._filmDetailsNewCommentComponent.rerender();
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
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSED) {
      this._closePopup();
    }
  }
}
