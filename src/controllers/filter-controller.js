import FilterComponent from '../components/filter.js';
import {RenderPosition, render, removeChild, appendChild, replace} from '../utils/render.js';
import {getFilmsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

const FILTER_NAMES = [`All movies`, `Watchlist`, `History`, `Favorites`];
const FILTER_ADDRESS = [`all`, `watchlist`, `history`, `favorites`];

// Текущие проблемы с фильтром :
// 1. Не перерисовывается карточка при изменении информации
//    а. Не понимаю, что именно должно перерисовываться - карточка или поле с карточками - (решается в следующем задании)
// 2. Не загорается активный фильтр (done)
// 3. Перестала работать сортировка (done)
// 4. Интегрировать модель данных с комментариями


export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => { // проходится по всем фильтрам и отрисовывает

      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        address: filterType.replace(/\s+/g, ``).trim().toLowerCase(),
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render(); // - my improvement
  }

  _onDataChange() {
    this.render();
  }
}
