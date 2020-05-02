import AbstractSmartComponent from "./abstract-smart-component";

const EmojiAddressArray = {
  SMILE: `smile`,
  ANGRY: `angry`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
};

const createEmojiImageTemplate = (emoji) => {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
};

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
                <p class="film-details__comment-text">${comment.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${comment.date}</span>
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

const createFilmDetailsTemplate = (film, emoji = ``, emojiInp = ``) => {
  const {name, poster, description, comments, rating, year, duration, genres} = film;
  const {age, director, writers, actors, releaseDate, country} = film.additional;

  const commentsMarkup = createCommentsMarkup(comments);
  const genresMarkup = createGenresMarkup(genres);

  const emojiSmileChecked = (emojiInp === EmojiAddressArray.SMILE) ? `checked` : ``;
  const emojiAngryChecked = (emojiInp === EmojiAddressArray.ANGRY) ? `checked` : ``;
  const emojiPukeChecked = (emojiInp === EmojiAddressArray.PUKE) ? `checked` : ``;
  const emojiSleepingChecked = (emojiInp === EmojiAddressArray.SLEEPING) ? `checked` : ``;

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
                  <td class="film-details__cell">${releaseDate} ${year}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration.hours}h ${duration.minutes}m</td>
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : `0`} </span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${emoji ? emoji : ``}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emojiSmileChecked}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emojiSleepingChecked}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emojiPukeChecked}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emojiAngryChecked}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._emoji = null;
    this._emojiInp = null;

    this._subscribeOnEvents();
  }

  reset() {
    this._emoji = null;
    this._emojiInp = null;

    this.rerender();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }

  _subscribeOnEvents() {

    this.getElement().querySelector(`input#emoji-smile`).addEventListener(`change`, () => {
      this._emoji = createEmojiImageTemplate(EmojiAddressArray.SMILE);
      this._emojiInp = EmojiAddressArray.SMILE;
      this.rerender();
    });

    this.getElement().querySelector(`input#emoji-sleeping`).addEventListener(`change`, () => {
      this._emoji = createEmojiImageTemplate(EmojiAddressArray.SLEEPING);
      this._emojiInp = EmojiAddressArray.SLEEPING;
      this.rerender();
    });

    this.getElement().querySelector(`input#emoji-puke`).addEventListener(`change`, () => {
      this._emoji = createEmojiImageTemplate(EmojiAddressArray.PUKE);
      this._emojiInp = EmojiAddressArray.PUKE;
      this.rerender();
    });

    this.getElement().querySelector(`input#emoji-angry`).addEventListener(`change`, () => {
      this._emoji = createEmojiImageTemplate(EmojiAddressArray.ANGRY);
      this._emojiInp = EmojiAddressArray.ANGRY;
      this.rerender();
    });
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._emoji, this._emojiInp);
  }

  setClickHandler(callback) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, callback);
  }

  setAddToWatchlistButtonHandler(callback) {
    const input = this.getElement().querySelector(`input[name="watchlist"]`);

    input.addEventListener(`change`, callback);
  }

  setAlreadyWatchedButtonhandler(callback) {
    const input = this.getElement().querySelector(`input[name="watched"]`);

    input.addEventListener(`change`, callback);
  }

  setAddToFavoriteButtonHandler(callback) {
    const input = this.getElement().querySelector(`input[name="favorite"]`);

    input.addEventListener(`change`, callback);
  }
}

