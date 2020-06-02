import {UserTitles} from '../const.js';

const FilmsNumber = {
  NOVICE: 1,
  FAN: 10,
  MOVIE_BUFF: 20,
};

export const getUserTitle = (films) => {
  const filmsInHistory = films.filter((film) => film.isInHistory).length;

  if (filmsInHistory >= FilmsNumber.NOVICE && filmsInHistory <= FilmsNumber.FAN) {
    return UserTitles.NOVICE;
  }

  if (filmsInHistory > FilmsNumber.FAN && filmsInHistory <= FilmsNumber.MOVIE_BUFF) {
    return UserTitles.FAN;
  }

  if (filmsInHistory > FilmsNumber.MOVIE_BUFF) {
    return UserTitles.MOVIE_BUFF;
  }

  return ``;
};
