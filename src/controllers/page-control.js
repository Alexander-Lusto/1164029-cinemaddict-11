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
import {SortType} from "../const.js";

const FILM_CARDS_SHOWING_ON_START = 5;
const FILM_CARDS_SHOWING_BY_BUTTON = 5;

const EXTRA_FILM_CARDS_COUNT = 2;
let showingCardsCount = FILM_CARDS_SHOWING_ON_START;

const body = document.querySelector(`body`);
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

const renderFilm = (container, film) => {

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const ClosePopupOnEscPress = (evt) => {
    if (evt.keyCode === 27) {
      removeChild(filmDetailsComponent);
    }
    document.removeEventListener(`keydown`, ClosePopupOnEscPress);
  };

  const ShowPopupOnClick = () => {
    appendChild(body, filmDetailsComponent);
    document.addEventListener(`keydown`, ClosePopupOnEscPress);
  };

  const ClosePopupOnClick = () => {
    removeChild(filmDetailsComponent);
    document.removeEventListener(`keydown`, ClosePopupOnEscPress);
  };

  filmCardComponent.setClickHandler(ShowPopupOnClick);
  filmDetailsComponent.setClickHandler(ClosePopupOnClick);

  render(container, filmCardComponent, RenderPosition.BEFOREEND);
};


export default class PageController {
  constructor(container) {
    this._container = container;

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
    let currentFilmsArray = filmsArray.slice(0, FILM_CARDS_SHOWING_ON_START);

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

    currentFilmsArray.forEach((film) => {
      renderFilm(filmsListContainer, film);
    });

    // кнопка show more
    render(filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHendler(() => {

      let previouseCardCount = showingCardsCount;
      showingCardsCount = showingCardsCount + FILM_CARDS_SHOWING_BY_BUTTON;
      const sortedFilms = getSortedFilms(filmsArray, this._sortComponent.getSortType(), 0, showingCardsCount);

      sortedFilms.slice(previouseCardCount, showingCardsCount).forEach((film) => {
        renderFilm(filmsListContainer, film);
      });

      if (showingCardsCount >= filmsArray.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedFilms = getSortedFilms(filmsArray, sortType, 0, showingCardsCount);
      filmsListContainer.innerHTML = ``;

      sortedFilms.forEach((film) => {
        renderFilm(filmsListContainer, film);
      });
    });

    // additional task

    // top rated
    const getTopRatedFilms = (array) => {
      return array.slice().sort((a, b) => b.rating - a.rating);
    };
    const filmsSortedByRating = getTopRatedFilms(filmsArray);

    render(films, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
    const topRatedFilmsListContainer = document.querySelector(`.films-list--extra .films-list__container`);

    for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
      renderFilm(topRatedFilmsListContainer, filmsSortedByRating[i]);
    }

    // most commented
    const getTopCommentedFilms = (array) => {
      return array.slice().sort((a, b) => b.comments.length - a.comments.length);
    };
    const filmsSortedByComments = getTopCommentedFilms(filmsArray);

    render(films, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);
    const mostCommentedFilmsListContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

    for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
      renderFilm(mostCommentedFilmsListContainer, filmsSortedByComments[i]);
    }
  }
}
