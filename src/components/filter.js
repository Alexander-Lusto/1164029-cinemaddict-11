import {createElement} from '../utils.js';

const createFilterMarkup = (filtersArray) => {

  return filtersArray.map((filter) => {
    const {address, name, count} = filter;
    return (
      `<a href="#${address}"
         class="main-navigation__item ${name === `All movies` ? `main-navigation__item--active` : ``}">
         ${name}
         ${name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>`
    );
  }).join(`\n`);
};

const createFilterTemplate = (filtersArray) => {

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilterMarkup(filtersArray)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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

