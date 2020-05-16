import UserTitleComponent from './components/user-title.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilmCards, getComements} from './mock/film.js';
import {RenderPosition, render} from './utils/render.js';
import PageControllerComponent from './controllers/page-controller.js';
import MoviesModel from './models/movies.js';
import CommentsModel from './models/comments.js';
import FilterController from './controllers/filter-controller.js';
/* import StatisticComponent from './components/statistic.js'; */

const FILM_CARDS_COUNT = 25;

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

const filmsArray = generateFilmCards(FILM_CARDS_COUNT);
const commentsArray = getComements(filmsArray);

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

moviesModel.setMovies(filmsArray);
commentsModel.setComments(commentsArray);

// const filtersArray = generateFilters(filmsArray);

render(header, new UserTitleComponent(filmsArray), RenderPosition.BEFOREEND);

const filterController = new FilterController(main, moviesModel);
filterController.render();

const pageControllerComponent = new PageControllerComponent(moviesModel, commentsModel);
pageControllerComponent.render();

render(footer, new FooterStatisticComponent(FILM_CARDS_COUNT), RenderPosition.BEFOREEND);


