import UserTitleComponent from './components/user-title.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilmCards, getComments} from './mock/film.js';
import {RenderPosition, render} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import MoviesModel from './models/movies.js';
import CommentsModel from './models/comments.js';
import FilterController from './controllers/filter-controller.js';
/* import StatisticComponent from './components/statistic.js'; */

const FILM_CARDS_COUNT = 25;

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

const filmsArray = generateFilmCards(FILM_CARDS_COUNT);
const commentsArray = getComments(filmsArray);

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

moviesModel.setMovies(filmsArray);
commentsModel.setComments(commentsArray);

render(header, new UserTitleComponent(filmsArray), RenderPosition.BEFOREEND);

const filterController = new FilterController(main, moviesModel);
filterController.render();

const pageController = new PageController(moviesModel, commentsModel);
pageController.render();

render(footer, new FooterStatisticComponent(FILM_CARDS_COUNT), RenderPosition.BEFOREEND);


