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

const FILM_CARDS_COUNT = 5;
const EXTRA_FILM_CARDS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// rendering elements

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

render(header, createUserTitleTemplate(), `beforeend`);
render(main, createFilterTemplate(), `beforeend`);
render(main, createStatisticTemplate(), `beforeend`);
render(main, createFilmsTemplate(), `beforeend`);

const films = document.querySelector(`.films`);
render(films, createFilmsListTemplate(), `beforeend`);

const filmsList = document.querySelector(`.films-list`);
render(filmsList, createFilmsListContainerTemplate(), `beforeend`);

const filmsListContainer = document.querySelector(`.films-list__container`);
for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(), `beforeend`);
}

render(filmsList, createButtonShowMoreTemplate(), `beforeend`);

render(films, createTopRatedFilmsListTemplate(), `beforeend`);

const topRatedFilmsListContainer = document.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
  render(topRatedFilmsListContainer, createFilmCardTemplate(), `beforeend`);
}

render(films, createMostCommentedFilmsListTemplate(), `beforeend`);

const mostCommentedFilmsListContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);
for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
  render(mostCommentedFilmsListContainer, createFilmCardTemplate(), `beforeend`);
}

render(footer, createFilmDetailsTemplate(), `afterend`);
