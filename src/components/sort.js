import AbstractComponent from "./abstract-component";
import {SortType} from "../const.js";

const createSortTemplate = () => {

  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active"> Sort by default </a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button"> Sort by date </a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button"> Sort by rating </a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      const menuItem = this._element.querySelectorAll(`a`);
      for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].classList.remove(`sort__button--active`);
      }

      evt.target.classList.add(`sort__button--active`);

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      callback(this._currentSortType);
    });
  }

  setDefaultSortType() {
    this._currentSortType = SortType.DEFAULT;
    const menuItem = this._element.querySelectorAll(`a`);
    const defaultItem = this._element.querySelector(`a:first-child`);
    for (let i = 0; i < menuItem.length; i++) {
      menuItem[i].classList.remove(`sort__button--active`);
    }
    defaultItem.classList.add(`sort__button--active`);
  }
}

