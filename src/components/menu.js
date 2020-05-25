import AbstractComponent from './abstract-component.js';
import {MenuItem} from '../main.js';

export const NAVIGATION_ACTIVE = `main-navigation__item--active`;

const createMenuTemplate = () => {

  return (
    `<nav class="main-navigation">
      <a href="#stats" id="${MenuItem.STATS}" class="main-navigation__additional">Stats</a>
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
      if (evt.target.tagName !== `A` && evt.target.tagName !== `SPAN`) {
        return;
      }

      if (evt.target.id === MenuItem.STATS) { // сбросить активный класс с фильтра
        const filmsNavigationItems = document.querySelectorAll(`#${MenuItem.FILMS}`);
        for (let i = 0; i < filmsNavigationItems.length; i++) {
          filmsNavigationItems[i].classList.remove(NAVIGATION_ACTIVE);
        }
      }

      const statisticMenuItem = evt.target;
      callback(statisticMenuItem.id);
      statisticMenuItem.classList.add(NAVIGATION_ACTIVE); // повесить активный класс на статистику
    });
  }
}
