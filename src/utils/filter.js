import {FilterType} from "../const.js";


const getFilmsInFavorites = (films) => {
  return films.filter((film) => film.isInFavorites);
};

const getFilmsInWatchlist = (films) => {
  return films.filter((film) => film.isInWatchlist);
};

const getFilmsInHistory = (films) => {
  return films.filter((film) => film.isInHistory);
};

export const getFilmsByFilter = (films, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.FAVORITES:
      return getFilmsInFavorites(films);
    case FilterType.WATCHLIST:
      return getFilmsInWatchlist(films);
    case FilterType.HISTORY:
      return getFilmsInHistory(films);
  }

  return films;
};
