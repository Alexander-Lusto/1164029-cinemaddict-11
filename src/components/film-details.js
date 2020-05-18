import AbstractSmartComponent from "./abstract-smart-component";
import moment from 'moment';
import he from 'he';

// const he = require(`he`);

const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    return (
      `
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
              </span>
              <div>
                <p class="film-details__comment-text">${he.encode(comment.text)}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${moment(comment.date).format(`YYYY/MM/DD hh:mm`)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
      `
    );
  }).join(`\n`);
};

const createGenresMarkup = (genres) => {

  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};

const createFilmDetailsTemplate = (film, filmComments) => {
  const {name, poster, description, rating, releaseDate, duration, genres, isInWatchlist, isInHistory, isInFavorites} = film;
  const {age, director, writers, actors, country} = film.additional;
  const {comments} = filmComments;

  const commentsMarkup = createCommentsMarkup(comments);
  const genresMarkup = createGenresMarkup(genres);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${name}">

              <p class="film-details__age">${age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(releaseDate).format(`DD MMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${moment.utc(moment.duration(duration, `minutes`).asMilliseconds()).format(`h[h] mm[m]`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genresMarkup}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isInHistory ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isInFavorites ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : `0`} </span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._comments);
  }

  setClickHandler(callback) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, callback);
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

  setDeleteButtonHandler(callback) {
    const deleteButtons = Array.from(this.getElement().querySelectorAll(`.film-details__comment-delete`));
    deleteButtons.forEach((button, index) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        callback(index);
      });
    });
  }
}

