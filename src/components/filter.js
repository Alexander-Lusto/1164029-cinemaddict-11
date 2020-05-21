import AbstractComponent from "./abstract-component";
import {FilterType} from '../const.js';

const createFilterMarkup = (filtersArray) => {
  return filtersArray.map((filter) => {
    const {address, name, count, checked} = filter;
    return (
      `<a href="#${address}"
         data-filter-type="${name}"
         class="main-navigation__item${checked ? ` main-navigation__item--active` : ``}">
         ${name}
         ${name === FilterType.ALL ? `` : `<span  class="main-navigation__item-count" data-filter-type="${name}">${count}</span>`}
      </a>`
    );
  }).join(`\n`);
};

const createFilterTemplate = (filtersArray) => {
  return (
    `<div class="main-navigation__items">
      ${createFilterMarkup(filtersArray)}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._currenFilterType = FilterType.ALL;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(callback) {

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A` && evt.target.tagName !== `SPAN`) {
        return;
      }
      const menuItem = document.querySelector(`.main-navigation__additional`);
      menuItem.classList.remove(`main-navigation__item--active`);

      callback(evt.target.dataset.filterType);
    });
  }
}

