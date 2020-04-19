import {createElement} from '../utils.js';

const createFooterStatisticTemplate = (moviesNumber) => {

  return (
    `<p>${moviesNumber} movies inside</p>`
  );
};

export default class FooterStatistic {
  constructor(moviesNumber) {
    this._moviesNumber = moviesNumber;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._moviesNumber);
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
