import UserTitleComponent from './components/user-title.js';
import FilterComponent from './components/filter.js';
import StatisticComponent from './components/statistic.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmDetailsComponent from './components/film-details.js';
import FilmsComponent from './components/films.js';
import FilmsListComponent from './components/films-list.js';
import FilmsListContainerComponent from './components/films-list-container.js';
import NoFilmsComponent from './components/no-films.js';
import MostCommentedFilmsListComponent from './components/most-commented-films-list.js';
import TopRatedFilmsListComponent from './components/top-rated-films-list.js';
import SortComponent from './components/sort.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilmCards} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {RenderPosition, render, remove, removeChild, appendChild} from './utils/render.js';
import PageControllerComponent from './controllers/page-control.js';

const FILM_CARDS_COUNT = 25;

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

const filmsArray = generateFilmCards(FILM_CARDS_COUNT);
let filtersArray = generateFilters(filmsArray);

render(header, new UserTitleComponent(filmsArray), RenderPosition.BEFOREEND);
render(main, new FilterComponent(filtersArray), RenderPosition.BEFOREEND);
render(main, new SortComponent(filtersArray), RenderPosition.BEFOREEND);
render(main, new StatisticComponent(filmsArray), RenderPosition.BEFOREEND);
render(main, new FilmsComponent(), RenderPosition.BEFOREEND);

const pageControllerComponent = new PageControllerComponent();
pageControllerComponent.render(filmsArray);

render(footer, new FooterStatisticComponent(FILM_CARDS_COUNT), RenderPosition.BEFOREEND);

