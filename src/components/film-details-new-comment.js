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

const createFilmDetailsCommentSectionTemplate = (emoji = ``, emojiInp = ``) => {

  const emojiSmileChecked = (emojiInp === EmojiAddressArray.SMILE) ? `checked` : ``;
  const emojiAngryChecked = (emojiInp === EmojiAddressArray.ANGRY) ? `checked` : ``;
  const emojiPukeChecked = (emojiInp === EmojiAddressArray.PUKE) ? `checked` : ``;
  const emojiSleepingChecked = (emojiInp === EmojiAddressArray.SLEEPING) ? `checked` : ``;

  return (
    `<div class="film-details__new-comment">
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
      </div>`
  );
};

export default class FilmDetailsNewComment extends AbstractSmartComponent {
  constructor() {
    super();

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
    return createFilmDetailsCommentSectionTemplate(this._emoji, this._emojiInp);
  }
}

