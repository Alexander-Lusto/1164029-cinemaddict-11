import AbstractComponent from "./abstract-component";

const createMenuTemplate = () => {

  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {

  getTemplate() {
    return createMenuTemplate();
  }

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.checked = true;
    }
  }

  setOnChange(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      if (evt.target.className === `main-navigation__additional`) { // сбросить активный класс с фильтра
        const filterItems = document.querySelectorAll(`.main-navigation__item`);
        for (let i = 0; i < filterItems.length; i++) {
          filterItems[i].classList.remove(`main-navigation__item--active`);
        }
      }

      const menuItem = evt.target;
      callback(menuItem.className);
      menuItem.classList.add(`main-navigation__item--active`); // повесить активный класс на статистику
    });
  }
}
