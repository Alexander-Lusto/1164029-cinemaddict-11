import AbstractComponent from "./abstract-component";


const createFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmListContainer extends AbstractComponent {

  getTemplate() {
    return createFilmsListContainerTemplate();
  }

}
