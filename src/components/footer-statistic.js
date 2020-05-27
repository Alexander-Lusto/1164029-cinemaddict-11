import AbstractComponent from "./abstract-component";


const createFooterStatisticTemplate = (moviesNumber) => {

  return (
    `<p>${moviesNumber} movies inside</p>`
  );
};

export default class FooterStatistic extends AbstractComponent {
  constructor(moviesModel) {
    super();
    this._moviesNumber = moviesModel.getMovies().length;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._moviesNumber);
  }
}
