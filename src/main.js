import UserTitleComponent from './components/user-title.js';
import FilterComponent from './components/filter.js';
import StatisticComponent from './components/statistic.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmDetailsComponent from './components/film-details.js';
import FilmsComponent from './components/films.js';
import FilmsListComponent from './components/films-list.js';
import FilmsListContainerComponent from './components/films-list-container.js';
import MostCommentedFilmsListComponent from './components/most-commented-films-list.js';
import TopRatedFilmsListComponent from './components/top-rated-films-list.js';
import SortComponent from './components/sort.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilmCards} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {RenderPosition, render} from './utils.js';


const FILM_CARDS_COUNT = 20;
const FILM_CARDS_SHOWING_ON_START = 5;
const FILM_CARDS_SHOWING_BY_BUTTON = 5;

const EXTRA_FILM_CARDS_COUNT = 2;
let showingCardsCount = FILM_CARDS_SHOWING_ON_START;

// rendering elements
const body = document.querySelector(`body`);
const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

const filmsArray = generateFilmCards(FILM_CARDS_COUNT);
let currentFilmsArray = filmsArray.slice(0, FILM_CARDS_SHOWING_ON_START);
let filtersArray = generateFilters(filmsArray);

const renderFilm = (container, film) => {

  const filmCard = new FilmCardComponent(film).getElement();
  const filmCardPoster = filmCard.querySelector(`.film-card__poster`);
  const filmCardTitle = filmCard.querySelector(`.film-card__title`);
  const filmCardComments = filmCard.querySelector(`.film-card__comments`);

  const filmDetails = new FilmDetailsComponent(film).getElement();
  const filmDetailsCloseButton = filmDetails.querySelector(`.film-details__close-btn`);

  const ClosePopupOnEscPress = (evt) => {
    if (evt.keyCode === 27) {
      body.removeChild(filmDetails);
    }
    document.removeEventListener(`keydown`, ClosePopupOnEscPress);
  };

  const ShowPopupOnClick = () => {
    body.appendChild(filmDetails);
    document.addEventListener(`keydown`, ClosePopupOnEscPress);
  };

  const ClosePopupOnClick = () => {
    body.removeChild(filmDetails);
    document.removeEventListener(`keydown`, ClosePopupOnEscPress);
  };

  filmCardPoster.addEventListener(`click`, ShowPopupOnClick);
  filmCardTitle.addEventListener(`click`, ShowPopupOnClick);
  filmCardComments.addEventListener(`click`, ShowPopupOnClick);

  filmDetailsCloseButton.addEventListener(`click`, ClosePopupOnClick);

  render(container, filmCard, RenderPosition.BEFOREEND);
};

render(header, new UserTitleComponent(filmsArray).getElement(), RenderPosition.BEFOREEND);
render(main, new FilterComponent(filtersArray).getElement(), RenderPosition.BEFOREEND);
render(main, new SortComponent(filtersArray).getElement(), RenderPosition.BEFOREEND);
render(main, new StatisticComponent(filmsArray).getElement(), RenderPosition.BEFOREEND);
render(main, new FilmsComponent().getElement(), RenderPosition.BEFOREEND);

const films = document.querySelector(`.films`);
render(films, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);

const filmsList = document.querySelector(`.films-list`);
render(filmsList, new FilmsListContainerComponent().getElement(), RenderPosition.BEFOREEND);

const filmsListContainer = document.querySelector(`.films-list__container`);

currentFilmsArray.forEach((film) => {
  renderFilm(filmsListContainer, film);
});

// кнопка show more
render(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
const button = main.querySelector(`.films-list__show-more`);

button.addEventListener(`click`, () => {
  // показать карточки
  let previouseCardCount = showingCardsCount;
  showingCardsCount = showingCardsCount + FILM_CARDS_SHOWING_BY_BUTTON;

  filmsArray.slice(previouseCardCount, showingCardsCount).forEach((film) => {
    renderFilm(filmsListContainer, film);
  });
  // удалить кнопку при отрисовке всех карточек
  if (showingCardsCount >= filmsArray.length) {
    button.remove();
  }
});


// additional task

// top rated
const getTopRatedFilms = (array) => {
  return array.slice().sort((a, b) => b.rating - a.rating);
};
const filmsSortedByRating = getTopRatedFilms(filmsArray);

render(films, new TopRatedFilmsListComponent().getElement(), RenderPosition.BEFOREEND);
const topRatedFilmsListContainer = document.querySelector(`.films-list--extra .films-list__container`);

for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
  renderFilm(topRatedFilmsListContainer, filmsSortedByRating[i]);
}

// most commented
const getTopCommentedFilms = (array) => {
  return array.slice().sort((a, b) => b.comments.length - a.comments.length);
};
const filmsSortedByComments = getTopCommentedFilms(filmsArray);

render(films, new MostCommentedFilmsListComponent().getElement(), RenderPosition.BEFOREEND);
const mostCommentedFilmsListContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
  renderFilm(mostCommentedFilmsListContainer, filmsSortedByComments[i]);
}


render(footer, new FooterStatisticComponent(FILM_CARDS_COUNT).getElement(), RenderPosition.BEFOREEND);

