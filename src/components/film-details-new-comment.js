import AbstractSmartComponent from "./abstract-smart-component";
import moment from 'moment';

const EmojiAddressArray = [
  {SMILE: `smile`},
  {SLEEPING: `sleeping`},
  {PUKE: `puke`},
  {ANGRY: `angry`},
];

const createEmojiImageTemplate = (emoji) => {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}" data-emoji-type="${emoji ? emoji : `none`}">`;
};

const createFilmDetailsCommentSectionTemplate = (comment, emoji, emojiInp) => {

  const emojiSmileChecked = (emojiInp === EmojiAddressArray.SMILE) ? `checked` : ``;
  const emojiAngryChecked = (emojiInp === EmojiAddressArray.ANGRY) ? `checked` : ``;
  const emojiPukeChecked = (emojiInp === EmojiAddressArray.PUKE) ? `checked` : ``;
  const emojiSleepingChecked = (emojiInp === EmojiAddressArray.SLEEPING) ? `checked` : ``;

  return (
    `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${emoji ? emoji : ``}</div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
          placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ``}</textarea>
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
      </div>`
  );
};

export default class FilmDetailsNewComment extends AbstractSmartComponent {
  constructor() {
    super();

    this._emoji = null;
    this._emojiInp = null;
    this._textarea = null;

    this._subscribeOnEvents();
  }

  reset() {
    this._emoji = null;
    this._emojiInp = null;
    this._comment = null;

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

    const emojiArray = this.getElement().querySelectorAll(`input`);

    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].addEventListener(`change`, () => {
        this._emoji = createEmojiImageTemplate(Object.values(EmojiAddressArray[i]));
        this._emojiInp = Object.values(EmojiAddressArray[i]);
        this.rerender();
      });
    }

    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    textarea.addEventListener(`input`, () => {
      this._comment = textarea.value;
    });
  }

  getTemplate() {
    return createFilmDetailsCommentSectionTemplate(this._comment, this._emoji, this._emojiInp);
  }

  setAddCommentHandler(callback) {
    document.addEventListener(`keydown`, (evt) => {

      if (evt.ctrlKey && evt.key === `Enter` && this.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emojiType) {
        const comment = {
          emoji: this.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emojiType,
          text: this.getElement().querySelector(`.film-details__comment-input`).value,
          author: `User`,
          date: moment().format(`YYYY/MM/DD hh:mm`),
        };
        callback(comment);
      }
    });
  }
}

