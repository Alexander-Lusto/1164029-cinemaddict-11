import AbstractComponent from "./abstract-component";
import {FilterType} from '../const.js';

const createFilterMarkup = (filtersArray) => {

  return filtersArray.map((filter) => {
    const {address, name, count, checked} = filter;
    return (
      `<a href="#${address}"
         id="${address}"
         class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">
         ${name}
         ${name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}
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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      handler(evt.target.id);
    });
  }
}

