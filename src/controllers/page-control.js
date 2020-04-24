import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmDetailsComponent from '../components/film-details.js';
import FilmsListComponent from '..//components/films-list.js';
import FilmsListContainerComponent from '../components/films-list-container.js';
import NoFilmsComponent from '../components/no-films.js';
import MostCommentedFilmsListComponent from '../components/most-commented-films-list.js';
import TopRatedFilmsListComponent from '../components/top-rated-films-list.js';
import {RenderPosition, render, remove, removeChild, appendChild} from '../utils/render.js';

const FILM_CARDS_SHOWING_ON_START = 5;
const FILM_CARDS_SHOWING_BY_BUTTON = 5;

const EXTRA_FILM_CARDS_COUNT = 2;
let showingCardsCount = FILM_CARDS_SHOWING_ON_START;

const body = document.querySelector(`body`);

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

  filmCardComponent.setclickHandler(ShowPopupOnClick);
  filmDetailsComponent.setClickHandler(ClosePopupOnClick);

  render(container, filmCardComponent, RenderPosition.BEFOREEND);
};


export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(filmsArray) {
    let currentFilmsArray = filmsArray.slice(0, FILM_CARDS_SHOWING_ON_START);

    const films = document.querySelector(`.films`);
    render(films, new FilmsListComponent(), RenderPosition.BEFOREEND);

    const filmsList = document.querySelector(`.films-list`);
    render(filmsList, new FilmsListContainerComponent(), RenderPosition.BEFOREEND);

    const filmsListContainer = document.querySelector(`.films-list__container`);

    if (filmsArray.length === 0) {
      render(filmsListContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
      return;
    }

    currentFilmsArray.forEach((film) => {
      renderFilm(filmsListContainer, film);
    });

    // кнопка show more
    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(filmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHendler(() => {

      let previouseCardCount = showingCardsCount;
      showingCardsCount = showingCardsCount + FILM_CARDS_SHOWING_BY_BUTTON;

      filmsArray.slice(previouseCardCount, showingCardsCount).forEach((film) => {
        renderFilm(filmsListContainer, film);
      });

      if (showingCardsCount >= filmsArray.length) {
        remove(showMoreButtonComponent);
      }
    });


    // additional task

    // top rated
    const getTopRatedFilms = (array) => {
      return array.slice().sort((a, b) => b.rating - a.rating);
    };
    const filmsSortedByRating = getTopRatedFilms(filmsArray);

    render(films, new TopRatedFilmsListComponent(), RenderPosition.BEFOREEND);
    const topRatedFilmsListContainer = document.querySelector(`.films-list--extra .films-list__container`);

    for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
      renderFilm(topRatedFilmsListContainer, filmsSortedByRating[i]);
    }

    // most commented
    const getTopCommentedFilms = (array) => {
      return array.slice().sort((a, b) => b.comments.length - a.comments.length);
    };
    const filmsSortedByComments = getTopCommentedFilms(filmsArray);

    render(films, new MostCommentedFilmsListComponent(), RenderPosition.BEFOREEND);
    const mostCommentedFilmsListContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

    for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
      renderFilm(mostCommentedFilmsListContainer, filmsSortedByComments[i]);
    }
  }
}
