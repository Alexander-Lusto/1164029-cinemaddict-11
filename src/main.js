import UserTitleComponent from './components/user-title.js';
import FilterComponent from './components/filter.js';
/* import StatisticComponent from './components/statistic.js'; */
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilmCards} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {RenderPosition, render} from './utils/render.js';
import PageControllerComponent from './controllers/page-controller.js';

const FILM_CARDS_COUNT = 25;

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

const filmsArray = generateFilmCards(FILM_CARDS_COUNT);
let filtersArray = generateFilters(filmsArray);

render(header, new UserTitleComponent(filmsArray), RenderPosition.BEFOREEND);
render(main, new FilterComponent(filtersArray), RenderPosition.BEFOREEND);
/* render(main, new StatisticComponent(filmsArray), RenderPosition.BEFOREBEGIN); */

const pageControllerComponent = new PageControllerComponent();
pageControllerComponent.render(filmsArray);

render(footer, new FooterStatisticComponent(FILM_CARDS_COUNT), RenderPosition.BEFOREEND);

