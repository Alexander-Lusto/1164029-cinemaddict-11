import {FilterType} from '../const.js';
import {getFilmsByFilter} from '../utils/filter.js';


export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getMovies() {
    console.log(`get movies:`);
    console.log(getFilmsByFilter(this._movies, this._activeFilterType));
    console.log(this._activeFilterType);
    return getFilmsByFilter(this._movies, this._activeFilterType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies); // при надобности переделать на Array from
    this._callHandlers(this._dataChangeHandlers);
  }

  updateMovies(id, film) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      console.log(`1`);
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), film, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    console.log(`update`);
    return true;
  }

  setFilter(filterType) {
    console.log(`2 - model - set active filter type`);
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
    console.log(this._activeFilterType);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    console.log(5);
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    console.log(`3 - model - call all handlers`);
    handlers.forEach((handler) => {
      handler();
    });
  }
}
