import {UserTitles} from '../const.js';

export const getUserTitle = (films) => {
  const filmsInHistory = films.filter((film) => film.isInHistory).length;

  if (filmsInHistory >= 1 && filmsInHistory <= 10) {
    return UserTitles.NOVICE;
  } else if (filmsInHistory >= 11 && filmsInHistory <= 20) {
    return UserTitles.FAN;
  } else if (filmsInHistory >= 21) {
    return UserTitles.MOVIE_BUFF;
  } else {
    return ``;
  }
};
