import FilmsComponent from '../components/films.js';
import SortComponent from '../components/sort.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsListContainerComponent from '../components/films-list-container.js';
import NoFilmsComponent from '../components/no-films.js';
import MostCommentedFilmsListComponent from '../components/most-commented-films-list.js';
import TopRatedFilmsListComponent from '../components/top-rated-films-list.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {SortType} from "../const.js";
import MovieController from './movie-controller.js';

const FILM_CARDS_SHOWING_ON_START = 5;
const FILM_CARDS_SHOWING_BY_BUTTON = 5;

const EXTRA_FILM_CARDS_COUNT = 2;
const main = document.querySelector(`.main`);

const getSortedFilms = (films, type, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (type) {
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderFilms = (filmsListContainer, films, onDataChange, onViewChange) => {

  return films.map((film) => {
    const movieController = new MovieController(filmsListContainer, onDataChange, onViewChange);
    movieController.render(film);
    return movieController;
  });
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._showingCardsCount = FILM_CARDS_SHOWING_ON_START;

    this._films = [];
    this._showedFilmsControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent = new SortComponent(SortType.DEFAULT);
    this._filmsComponent = new FilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._topRatedFilmsListComponent = new TopRatedFilmsListComponent();
    this._mostCommentedFilmsListComponent = new MostCommentedFilmsListComponent();
  }

  render(filmsArray) {
    this._films = filmsArray;
    let currentFilmsArray = filmsArray.slice(0, this._showingCardsCount);

    render(main, this._sortComponent, RenderPosition.BEFOREEND);
    render(main, this._filmsComponent, RenderPosition.BEFOREEND);

    const films = document.querySelector(`.films`);
    render(films, this._filmsListComponent, RenderPosition.BEFOREEND);

    const filmsList = document.querySelector(`.films-list`);
    render(filmsList, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    const filmsListContainer = document.querySelector(`.films-list__container`);

    if (filmsArray.length === 0) {
      render(filmsListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }
    let newFilms = renderFilms(filmsListContainer, currentFilmsArray, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    // кнопка show more
    render(filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHendler(() => {

      let previouseCardCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + FILM_CARDS_SHOWING_BY_BUTTON;
      const sortedFilms = getSortedFilms(filmsArray, this._sortComponent.getSortType(), 0, this._showingCardsCount);

      newFilms = renderFilms(filmsListContainer, sortedFilms.slice(previouseCardCount, this._showingCardsCount), this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._showingCardsCount >= filmsArray.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._showingCardsCount = FILM_CARDS_SHOWING_ON_START;
      const sortedFilms = getSortedFilms(filmsArray, sortType, 0, this._showingCardsCount);
      filmsListContainer.innerHTML = ``;

      newFilms = renderFilms(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    });

    // additional task

    // top rated
    const getTopRatedFilms = (array) => {
      return array.sort((a, b) => b.rating - a.rating);
    };
    const filmsSortedByRating = getTopRatedFilms(filmsArray);

    render(films, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
    const topRatedFilmsListContainer = document.querySelector(`.films-list--extra .films-list__container`);

    newFilms = renderFilms(topRatedFilmsListContainer, filmsSortedByRating.slice(0, EXTRA_FILM_CARDS_COUNT), this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    // most commented
    const getTopCommentedFilms = (array) => {
      return array.sort((a, b) => b.comments.length - a.comments.length);
    };
    const filmsSortedByComments = getTopCommentedFilms(filmsArray);

    render(films, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);
    const mostCommentedFilmsListContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

    newFilms = renderFilms(mostCommentedFilmsListContainer, filmsSortedByComments.slice(0, EXTRA_FILM_CARDS_COUNT), this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }
}
