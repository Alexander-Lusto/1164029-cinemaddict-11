import AbstractSmartComponent from "./abstract-smart-component";
import moment from 'moment';

const createFilmDetailsTemplate = (film) => {
  const {isInWatchlist, isInHistory, isInFavorites} = film;

  return (
    `<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isInHistory ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isInFavorites ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`
  );
};

export default class FilmDetailsControls extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._comments);
  }

  setAddToWatchlistButtonHandler(callback) {
    const input = this.getElement().querySelector(`input[name="watchlist"]`);

    input.addEventListener(`change`, callback);
  }

  setAlreadyWatchedButtonHandler(callback) {
    const input = this.getElement().querySelector(`input[name="watched"]`);

    input.addEventListener(`change`, callback);
  }

  setAddToFavoriteButtonHandler(callback) {
    const input = this.getElement().querySelector(`input[name="favorite"]`);

    input.addEventListener(`change`, callback);
  }
}

