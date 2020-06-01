import FilmsComponent from '../components/films.js';
import SortComponent from '../components/sort.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsListContainerComponent from '../components/films-list-container.js';
import NoFilmsComponent from '../components/no-films.js';
import UserTitleComponent from '../components/user-title.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {SortType} from "../const.js";
import MovieController from './movie-controller.js';

const FILM_CARDS_SHOWING_ON_START = 5;
const FILM_CARDS_SHOWING_BY_BUTTON = 5;

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

const getSortedFilms = (films, type, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (type) {
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderFilms = (filmsListContainer, films, onDataChange, onViewChange, onCommentsChange, api, commentsModel) => {

  const movieControllers = [];
  for (let i = 0; i < films.length; i++) {
    const movieController = new MovieController(films[i], filmsListContainer, onDataChange, onViewChange, onCommentsChange, api, commentsModel);
    movieController.render(films[i]);
    movieControllers.push(movieController);
  }
  return movieControllers;
};

export default class PageController {
  constructor(moviesModel, commentsModel, api) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._showedFilmControllers = [];
    this._showingCardsCount = FILM_CARDS_SHOWING_ON_START;

    this._filmsList = null;
    this._filmsListContainer = null;

    this._films = [];
    this._comments = [];

    this._userTitleComponent = null;
    this._sortComponent = new SortComponent(SortType.DEFAULT);
    this._filmsComponent = new FilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);


    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._moviesModel.getMovies();

    const currentFilmsArray = this._films.slice(0, this._showingCardsCount);

    render(main, this._sortComponent, RenderPosition.BEFOREEND);
    render(main, this._filmsComponent, RenderPosition.BEFOREEND);

    const films = document.querySelector(`.films`);
    render(films, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._filmsList = document.querySelector(`.films-list`);
    render(this._filmsList, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._filmsListContainer = document.querySelector(`.films-list__container`);

    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderFilms(currentFilmsArray);
    this._renderShowMoreButton();
  }

  _renderFilms(films) {
    this._films = films;
    if (this._films.length === 0) { // поставить заглушку если при выбранном фильтре нет фильмов
      render(this._filmsListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (document.querySelector(`.films-list__title`)) { // убрать заглшку при переключении на другой фильтр
      document.querySelector(`.films-list__title`).remove();
    }

    const newFilms = renderFilms(this._filmsListContainer, films, this._onDataChange, this._onViewChange, this._onCommentsChange, this._api, this._commentsModel);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingCardsCount = this._showedFilmControllers.length;
  }

  renderUserTitle(films) {
    if (this._userTitleComponent) {
      remove(this._userTitleComponent);
    }
    this._userTitleComponent = new UserTitleComponent(films);
    render(header, this._userTitleComponent, RenderPosition.BEFOREEND);
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingCardsCount >= this._moviesModel.getMovies().length) {
      return;
    }

    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const previouseCardCount = this._showingCardsCount;
    const films = this._moviesModel.getMovies();

    this._showingCardsCount = this._showingCardsCount + FILM_CARDS_SHOWING_BY_BUTTON;

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), previouseCardCount, this._showingCardsCount);
    this._renderFilms(sortedFilms, this._comments);

    if (this._showingCardsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingCardsCount = this._showedFilmControllers.length;
    const sortedFilms = getSortedFilms(this._moviesModel.getMovies(), sortType, 0, FILM_CARDS_SHOWING_ON_START);

    this._removeFilms();
    this._renderFilms(sortedFilms);
    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {

    this._api.updateFilms(oldData.id, newData)
      .then((movie) => {
        const isSuccess = this._moviesModel.updateMovies(oldData.id, movie);

        if (isSuccess) {
          movieController.rerender(movie);
          this.renderUserTitle(this._moviesModel.getMoviesAll());
        }
      });
  }

  _onCommentsChange(movieController, oldData, newData, film) {
    if (oldData === null) { // добавление
      this._api.createComment(film.id, newData)
        .then((response) => {
          const isSuccess = this._commentsModel.setComments(response.comments);
          if (isSuccess) {
            movieController.resetTextarea();
            movieController.renderCommentsSection();
          }
        })
        .catch(() => {
          movieController.shakeTextarea();
        });
    } else if (newData === null) { // удаление
      this._api.deleteСomment(oldData.id)
        .then(() => {
          const isSuccess = this._commentsModel.removeComment(oldData.id);
          if (isSuccess) {
            movieController.resetTextarea();
            movieController.renderCommentsSection();
          }
        })
        .catch(() => {
          movieController.shakeComment(oldData.id);
        });
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((controller) => controller.setDefaultView());
  }

  _onFilterChange() {
    this._sortComponent.setDefaultSortType();
    this._onSortTypeChange(SortType.DEFAULT);
    this._updateFilms(FILM_CARDS_SHOWING_ON_START);
  }

  hide() {
    this._sortComponent.hide();
    this._filmsComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._filmsComponent.show();
  }

  showPreloader() {
    const preloader = document.createElement(`h1`);
    preloader.classList.add(`page-preloader`);
    preloader.textContent = `Loading...`;
    main.append(preloader);
  }

  removePreloader() {
    const preloader = document.querySelector(`.page-preloader`);
    preloader.remove();
  }
}
