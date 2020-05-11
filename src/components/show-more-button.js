import AbstractComponent from "./abstract-component";


const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractComponent {

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHendler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }

  removeClickHandler(callback) {
    this._element.removeEventListener(`click`, callback);
  }

}
