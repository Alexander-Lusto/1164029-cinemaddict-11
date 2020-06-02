import {UserTitles} from '../const.js';

const FILMS_NUMBER_FOR_NOVICE_TITLE = 1;
const FILMS_NUMBER_FOR_FAN_TITLE = 10;
const FILMS_NUMBER_FOR_MOVIE_BUFF_TITLE = 20;

export const getUserTitle = (films) => {
  const filmsInHistory = films.filter((film) => film.isInHistory).length;

  if (filmsInHistory >= FILMS_NUMBER_FOR_NOVICE_TITLE && filmsInHistory <= FILMS_NUMBER_FOR_FAN_TITLE) {
    return UserTitles.NOVICE;
  } else if (filmsInHistory > FILMS_NUMBER_FOR_FAN_TITLE && filmsInHistory <= FILMS_NUMBER_FOR_MOVIE_BUFF_TITLE) {
    return UserTitles.FAN;
  } else if (filmsInHistory > FILMS_NUMBER_FOR_MOVIE_BUFF_TITLE) {
    return UserTitles.MOVIE_BUFF;
  }

  return ``;
};
