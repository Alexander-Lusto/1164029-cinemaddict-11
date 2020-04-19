import {createElement} from '../utils.js';

const userTitles = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const createUserTitleTemplate = (films) => {
  const title = getUserTitle(films);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${title}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const getUserTitle = (films) => {
  const filmsInHistory = films.filter((it) => it.isInHistory).length;
  let title;

  if (filmsInHistory >= 1 && filmsInHistory <= 10) {
    title = userTitles.NOVICE;
  } else if (filmsInHistory >= 11 && filmsInHistory <= 20) {
    title = userTitles.FAN;
  } else if (filmsInHistory >= 21) {
    title = userTitles.MOVIE_BUFF;
  } else {
    title = ``;
  }

  return title;
};

export default class UserTitle {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createUserTitleTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
