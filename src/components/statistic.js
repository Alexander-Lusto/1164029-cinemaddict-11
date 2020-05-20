import {FILM_GENRES} from '../mock/film.js';
import {getUserTitle} from '../utils/utils.js';
import AbstractComponent from './abstract-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

/* const renderChart = (statisticCtx) => {
  // const BAR_HEIGHT = 50;
  // const statisticCtx = document.querySelector(`.statistic__chart`);

  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  // statisticCtx.height = BAR_HEIGHT * 5;

  const new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`], // передать наши жанры сюда
      datasets: [{
        data: [11, 8, 7, 4, 3],
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
}; */


const createStatisticTemplate = (films) => {
  const statistic = getStatisticInfo(films);
  const {watched, duration, topGenre} = statistic;
  const title = getUserTitle(films);
  return (
    `<section class="statistic">
      ${title ? `
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${title}</span>
        </p>` : ``}

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
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

export default class Statistic extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;

    // super.rerender();
    this._sortedGenres = getGenresSortedByWatches(this._films);
    this._sortedGenresNumber = getGenresNumberSortedByWatches(this._films);

    this._renderCharts();
  }

  getTemplate() {
    console.log(this._films);
    return createStatisticTemplate(this._films);
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
      this._statisticsChart = null;
    }
  }

  onPeriodChange() {
    this.getElement().querySelector(`form`);
  }
}
