import AbstractComponent from "./abstract-component";


const createFooterStatisticTemplate = (moviesNumber) => {

  return (
    `<p>${moviesNumber} movies inside</p>`
  );
};

export default class FooterStatistic extends AbstractComponent {
  constructor(moviesNumber) {
    super();
    this._moviesNumber = moviesNumber;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._moviesNumber);
  }
}
