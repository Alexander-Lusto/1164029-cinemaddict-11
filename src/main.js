import API from './api.js';
import CommentsModel from './models/comments.js';
import FilterController from './controllers/filter-controller.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import MenuComponent from './components/menu.js';
import MoviesModel from './models/movies.js';
import PageController from './controllers/page-controller.js';
import StatisticComponent from './components/statistic.js';
import UserTitleComponent from './components/user-title.js';
import {generateFilmCards, getComments} from './mock/film.js';
import {RenderPosition, render} from './utils/render.js';

export const AUTHORIZATION = `Basic $%a113678133a2#a%@^sa&@67878df&*sdf#d678fsf@^#d678fddfs&=`;

export const MenuItem = {
  FILMS: `films`,
  STATS: `stats`,
};

const FILM_CARDS_COUNT = 0;

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

const api = new API(AUTHORIZATION);
const filmsArray = generateFilmCards(FILM_CARDS_COUNT);
const commentsArray = getComments(filmsArray);

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

// moviesModel.setMovies(filmsArray);
//commentsModel.setComments(commentsArray);

render(header, new UserTitleComponent(filmsArray), RenderPosition.BEFOREEND);
const menuComponent = new MenuComponent();
render(main, menuComponent, RenderPosition.BEFOREEND);

const mainNavigation = main.querySelector(`.main-navigation`);

const filterController = new FilterController(mainNavigation, moviesModel);
filterController.render();

const statisticsComponent = new StatisticComponent(moviesModel);
statisticsComponent.hide();
render(main, statisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(moviesModel, commentsModel, api);
pageController.showPreloader();


menuComponent.setOnChange((menuItem) => {

  switch (menuItem) {
    case MenuItem.FILMS:
      statisticsComponent.hide();
      pageController.show();
      break;

    case MenuItem.STATS:
      pageController.hide();
      statisticsComponent.show();
      break;
  }
});

api.getFilms()
  .then((films) => {
    moviesModel.setMovies(films);
    pageController.removePreloader();
    pageController.render();
    render(footer, new FooterStatisticComponent(moviesModel), RenderPosition.BEFOREEND);
  })
  /* .catch(() => {
    pageController.removePreloader();
    pageController.render();
    render(footer, new FooterStatisticComponent(moviesModel), RenderPosition.BEFOREEND);
  }); */
