import {createUserTitleTemplate} from './components/user-title.js';
import {createFilterTemplate} from './components/filter.js';
import {createStatisticTemplate} from './components/statistic.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createButtonShowMoreTemplate} from './components/show-more-button.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmsListContainerTemplate} from './components/films-list-container.js';
import {createMostCommentedFilmsListTemplate} from './components/most-commented-films-list.js';
import {createTopRatedFilmsListTemplate} from './components/top-rated-films-list.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFooterStatisticTemplate} from './components/footer-statistic.js';
import {generateFilmCards} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {closePopup} from './utils.js';


const FILM_CARDS_COUNT = 20;
const FILM_CARDS_SHOWING_ON_START = 5;
const FILM_CARDS_SHOWING_BY_BUTTON = 5;

const EXTRA_FILM_CARDS_COUNT = 2;

let showingCardsCount = FILM_CARDS_SHOWING_ON_START;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// rendering elements
const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

const filmsArray = generateFilmCards(FILM_CARDS_COUNT);
let currentFilmsArray = filmsArray.slice(0, FILM_CARDS_SHOWING_ON_START);
let filtersArray = generateFilters(filmsArray);

render(header, createUserTitleTemplate(), `beforeend`);
render(main, createFilterTemplate(filtersArray), `beforeend`);
render(main, createSortingTemplate(filtersArray), `beforeend`);
render(main, createStatisticTemplate(filmsArray), `beforeend`);
render(main, createFilmsTemplate(), `beforeend`);

const films = document.querySelector(`.films`);
render(films, createFilmsListTemplate(), `beforeend`);

const filmsList = document.querySelector(`.films-list`);
render(filmsList, createFilmsListContainerTemplate(), `beforeend`);

const filmsListContainer = document.querySelector(`.films-list__container`);

currentFilmsArray.forEach((film) => {
  render(filmsListContainer, createFilmCardTemplate(film), `beforeend`);
});

render(filmsList, createButtonShowMoreTemplate(), `beforeend`);

// additional task

// top rated
const getTopRatedFilms = (array) => {
  return array.slice().sort((a, b) => b.rating - a.rating);
};
const filmsSortedByRating = getTopRatedFilms(filmsArray);

render(films, createTopRatedFilmsListTemplate(), `beforeend`);
const topRatedFilmsListContainer = document.querySelector(`.films-list--extra .films-list__container`);

for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
  render(topRatedFilmsListContainer, createFilmCardTemplate(filmsSortedByRating[i]), `beforeend`);
}

// most commented
const getTopCommentedFilms = (array) => {
  return array.slice().sort((a, b) => b.comments.length - a.comments.length);
};
const filmsSortedByComments = getTopCommentedFilms(filmsArray);


render(films, createMostCommentedFilmsListTemplate(), `beforeend`);
const mostCommentedFilmsListContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
  render(mostCommentedFilmsListContainer, createFilmCardTemplate(filmsSortedByComments[i]), `beforeend`);
}


render(footer, createFooterStatisticTemplate(FILM_CARDS_COUNT), `beforeend`);

// повесить на каждую карточку открытие попапа
const addShowingPopupOnClick = (cardArray) => {
  cardArray.forEach((it, i) => {

    it.addEventListener(`click`, () => {
      render(footer, createFilmDetailsTemplate(filmsArray[i]), `afterend`);

      const filmDetailsCloseButton = document.querySelector(`.film-details__close-btn`);
      const filmDetails = document.querySelector(`.film-details`);

      closePopup(filmDetailsCloseButton, filmDetails);
    });
  });
};

let filmCards = main.querySelectorAll(`.film-card`);
addShowingPopupOnClick(filmCards);

// кнопка show more
const button = main.querySelector(`.films-list__show-more`);

button.addEventListener(`click`, () => {
  // показать карточки
  let previouseCardCount = showingCardsCount;
  showingCardsCount = showingCardsCount + FILM_CARDS_SHOWING_BY_BUTTON;

  filmsArray.slice(previouseCardCount, showingCardsCount).forEach((film) => {
    render(filmsListContainer, createFilmCardTemplate(film), `beforeend`);
  });
  filmCards = Array.from(main.querySelectorAll(`.film-card`));
  addShowingPopupOnClick(filmCards.slice(previouseCardCount, showingCardsCount));

  // удалить кнопку при отрисовке всех карточек
  if (showingCardsCount >= filmsArray.length) {
    button.remove();
  }
});
