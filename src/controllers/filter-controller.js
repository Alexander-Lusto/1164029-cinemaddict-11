import FilterComponent from '../components/filter.js';
import {RenderPosition, render, removeChild, appendChild, replace} from '../utils/render.js';
import {getFilmsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

const FILTER_NAMES = [`All movies`, `Watchlist`, `History`, `Favorites`];
const FILTER_ADDRESS = [`all`, `watchlist`, `history`, `favorites`];

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._moviesModel.getMovies();
    const filters = Object.values(FilterType).map((filterType) => {

      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        address: filterType.replace(/\s+/g, ``).trim().toLowerCase(),
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange); // ??? разобраться

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this._render();

  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    console.log(`hello from filter change`);
  }
}
