import {createElement, getUserTitle} from '../utils.js';

const createUserTitleTemplate = (films) => {
  const title = getUserTitle(films);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${title}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
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
