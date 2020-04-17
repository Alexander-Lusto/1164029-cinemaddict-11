import {FILM_GENRES} from '../mock/film.js';

export const createStatisticTemplate = (films) => {
  const statistic = getStatisticInfo(films);
  const {watched, duration, topGenre} = statistic;
  return (
    `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">Sci-Fighter</span>
        </p>

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
      </section>`
  );
};

const getStatisticInfo = (films) => {
  const filmsInHistory = films.filter((it) => it.isInHistory);
  let filmDurationHours = 0;
  let filmDurationMinutes = 0;
  let genreRate = [];

  for (let i = 0; i <= FILM_GENRES.length; i++) {
    const key = FILM_GENRES[i];
    const object = {
      [key]: filmsInHistory.reduce((sum, film) => sum.concat(film.genres), []).filter((genre) => genre === key).length
    };
    genreRate.push(object);
  }

  genreRate = genreRate.sort((a, b) => Object.values(b) - Object.values(a));

  filmsInHistory.forEach((it) => {
    filmDurationHours += it.duration.hours;
    filmDurationMinutes += it.duration.minutes;
  });

  filmDurationHours += filmDurationMinutes / 60;
  filmDurationMinutes = filmDurationMinutes % 60;

  return {
    watched: filmsInHistory.length,
    duration: {
      hours: Math.round(filmDurationHours),
      minutes: filmDurationMinutes
    },
    topGenre: Object.keys(genreRate[0]),
  };
};
