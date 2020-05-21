import {FILM_GENRES} from '../mock/film.js';
import {getUserTitle} from '../utils/utils.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const TimePeriod = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const createStatisticTemplate = (films, activeItem, isStatisticsHidden) => {
  const statistic = getStatisticInfo(films);
  const {watched, duration, topGenre} = statistic;
  const title = getUserTitle(films);
  return (
    `<section class="statistic ${isStatisticsHidden ? `visually-hidden` : ``}">
      ${title ? `
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${title}</span>
        </p>` : ``}

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time"
          ${activeItem === TimePeriod.ALL_TIME ? `checked` : ``}>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today"
          ${activeItem === TimePeriod.TODAY ? `checked` : ``}>
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week"
          ${activeItem === TimePeriod.WEEK ? `checked` : ``}>
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month"
          ${activeItem === TimePeriod.MONTH ? `checked` : ``}>
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year"
          ${activeItem === TimePeriod.YEAR ? `checked` : ``}>
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${watched}<span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${duration.hours}<span class="statistic__item-description">h</span>${duration.minutes}<span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${topGenre}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>`
  );
};

const getStatisticInfo = (films) => {
  const filmsInHistory = films.filter((it) => it.isInHistory);
  let filmDurationHours = 0;
  let filmDurationMinutes = 0;
  let genreRate = [];

  if (filmsInHistory.length > 0) {
    for (let i = 0; i < FILM_GENRES.length; i++) {
      const key = FILM_GENRES[i];
      const object = {
        [key]: filmsInHistory.reduce((sum, film) => sum.concat(film.genres), []).filter((genre) => genre === key).length
      };
      genreRate.push(object);
    }
    genreRate = genreRate.sort((a, b) => Object.values(b) - Object.values(a));
  }

  filmsInHistory.forEach((it) => {
    filmDurationMinutes += it.duration;
  });

  filmDurationHours = filmDurationMinutes / 60;
  filmDurationMinutes = filmDurationMinutes % 60;

  return {
    watched: filmsInHistory.length,
    duration: {
      hours: Math.floor(filmDurationHours),
      minutes: filmDurationMinutes
    },
    topGenre: filmsInHistory.length > 0 ? Object.keys(genreRate[0]) : ``,
  };
};

const getGenresSortedByWatches = ((films) => { // раскидать все просмотренные фильмы по жанрам и вернуть отсортированный массив (от самого популярного к менее популярному)
  const filmsInHistory = films.filter((it) => it.isInHistory);
  let genreRate = [];

  if (filmsInHistory.length > 0) {
    for (let i = 0; i < FILM_GENRES.length; i++) {
      const key = FILM_GENRES[i];
      const object = {
        [key]: filmsInHistory.reduce((sum, film) => sum.concat(film.genres), []).filter((genre) => genre === key).length
      };
      genreRate.push(object);
    }
    genreRate = genreRate.sort((a, b) => Object.values(b) - Object.values(a));
  }
  const genreRateArray = [];

  genreRate.forEach((it) => {
    if (Object.values(it) > 0) { // отсеять непросмотренные жанры
      genreRateArray.push(Object.keys(it).join()); // взять ключи из массива объектов
    }
  });

  return genreRateArray;
});

const getGenresNumberSortedByWatches = ((films) => { // взять количество посмотренных фильмов для каждого жанра и вернуть массив с ними
  const filmsInHistory = films.filter((it) => it.isInHistory);
  let genreRate = [];

  if (filmsInHistory.length > 0) {
    for (let i = 0; i < FILM_GENRES.length; i++) {
      const key = FILM_GENRES[i];
      const object = {
        [key]: filmsInHistory.reduce((sum, film) => sum.concat(film.genres), []).filter((genre) => genre === key).length
      };
      genreRate.push(object);
    }
    genreRate = genreRate.sort((a, b) => Object.values(b) - Object.values(a));
  }
  const genreRateArray = [];

  genreRate.forEach((it) => {
    if (Object.values(it) > 0) { // отсеять непросмотренные жанры
      genreRateArray.push((Object.values(it)).join()); // взять значения из массива объектов и отправить в обычный массив
    }
  });

  return genreRateArray;
});

const getFilmsByPeriod = (allFilms, dateFrom) => {
  return allFilms.filter((film) => {
    return film.watchingDate > dateFrom;
  });
};

export default class Statistic extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;

    this._films = this._moviesModel.moviesAll;
    this._activeItem = TimePeriod.ALL_TIME;
    this._isStatisticsHidden = true;


    this._sortedGenres = getGenresSortedByWatches(this._moviesModel.moviesAll);
    this._sortedGenresNumber = getGenresNumberSortedByWatches(this._moviesModel.moviesAll);

    this._renderCharts();
    this._onPeriodChange();
  }

  getTemplate() {
    return createStatisticTemplate(this._films, this._activeItem, this._isStatisticsHidden);
  }

  _renderStatistics() {
    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * this._sortedGenres.length;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._sortedGenres,
        datasets: [{
          data: this._sortedGenresNumber,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _renderCharts() {
    this._resetCharts();
    this._renderStatistics();
  }

  _resetCharts() {
    if (this._statisticsChart) {
      this._statisticsChart.destroy();
      this._sortedGenres = null;
      this._sortedGenresNumber = null;
    }
  }

  _onPeriodChange() {
    this.getElement().querySelector(`form`).addEventListener(`change`, (evt) => {

      switch (evt.target.value) {
        case TimePeriod.ALL_TIME:
          this._activeItem = TimePeriod.ALL_TIME;
          this.rerender(this._moviesModel.moviesAll);
          break;

        case TimePeriod.TODAY:
          this._activeItem = TimePeriod.TODAY;
          const today = new Date(new Date() - new Date().getHours() * 60 * 60 * 1000 - new Date().getMinutes() * 60 * 1000 - new Date().getSeconds() * 1000); // c 00: 00 сегодняшнего дня
          this.rerender(getFilmsByPeriod(this._moviesModel.moviesAll, today));
          break;

        case TimePeriod.WEEK:
          this._activeItem = TimePeriod.WEEK;
          const week = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);
          this.rerender(getFilmsByPeriod(this._moviesModel.moviesAll, week));
          break;

        case TimePeriod.MONTH:
          this._activeItem = TimePeriod.MONTH;
          const month = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
          this.rerender(getFilmsByPeriod(this._moviesModel.moviesAll, month));
          break;

        case TimePeriod.YEAR:
          this._activeItem = TimePeriod.YEAR;
          const year = new Date(new Date() - 365 * 24 * 60 * 60 * 1000);
          this.rerender(getFilmsByPeriod(this._moviesModel.moviesAll, year));
          break;
      }
    });

  }

  recoveryListeners() {
    this._onPeriodChange();
  }

  rerender(films) {
    this._films = films;
    this._sortedGenres = getGenresSortedByWatches(films);
    this._sortedGenresNumber = getGenresNumberSortedByWatches(films);
    super.rerender();
    this._renderCharts();
  }

  show() {
    this._isStatisticsHidden = false;
    super.show();
    this.rerender(this._moviesModel.moviesAll);
  }

}
