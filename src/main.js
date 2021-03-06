import API from './api.js';
import CommentsModel from './models/comments.js';
import FilterController from './controllers/filter-controller.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import MenuComponent from './components/menu.js';
import MoviesModel from './models/movies.js';
import PageController from './controllers/page-controller.js';
import StatisticComponent from './components/statistic.js';
import {RenderPosition, render} from './utils/render.js';

const AUTHORIZATION = `Basic adlhfdal;fhdljfh1283712098ihzsuhiusadsa=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

export const MenuItem = {
  FILMS: `films`,
  STATS: `stats`,
};

const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const renderPage = () => {
  pageController.removePreloader();
  pageController.render();
  render(footer, new FooterStatisticComponent(moviesModel), RenderPosition.BEFOREEND);
};

const api = new API(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();


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
    pageController.renderUserTitle(films);
    renderPage();
  })
  .catch(() => {
    renderPage();
  });
