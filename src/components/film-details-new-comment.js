import AbstractSmartComponent from './abstract-smart-component.js';
import {SHAKE_ANIMATION_TIMEOUT} from '../controllers/movie-controller.js';

const EmojiName = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const createEmojiImageTemplate = (emoji) => {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}" data-emoji-type="${emoji ? emoji : `none`}">`;
};

const getEmojiTemplate = (targetName) => {
  const emojiNames = Object.values(EmojiName);
  return emojiNames.map((name) => {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}"
              ${(targetName === name) ? `checked` : ``}>
            <label class="film-details__emoji-label" for="emoji-${name}">
              <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
            </label>`;
  }).join(`\n`);
};

const createFilmDetailsCommentSectionTemplate = (comment, emojiImage, emojiName) => {

  const emojiTemplate = getEmojiTemplate(emojiName);

  return (
    `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${emojiImage ? emojiImage : ``}</div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
          placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ``}</textarea>
        </label>

        <div class="film-details__emoji-list">
          ${emojiTemplate}
        </div>
      </div>`
  );
};

export default class FilmDetailsNewComment extends AbstractSmartComponent {
  constructor() {
    super();

    this._callback = null;

    this._emojiImage = null;
    this._emojiName = null;
    this._comment = null;

    this._subscribeOnEvents();
    this.newCommentSubmitHandler = this.newCommentSubmitHandler.bind(this);
  }

  reset() {
    this._emojiImage = null;
    this._emojiName = null;
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
    const emojiInputs = this.getElement().querySelectorAll(`input`);
    for (let i = 0; i < emojiInputs.length; i++) {
      emojiInputs[i].addEventListener(`change`, () => {
        this._emojiImage = createEmojiImageTemplate(Object.values(EmojiName)[i]);
        this._emojiName = Object.values(EmojiName)[i];
        this.rerender();
      });
    }

    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    textarea.addEventListener(`input`, () => {
      this._comment = textarea.value;
    });
  }

  getTemplate() {
    return createFilmDetailsCommentSectionTemplate(this._comment, this._emojiImage, this._emojiName);
  }

  setAddCommentHandler(callback) {
    this._callback = callback;
    document.addEventListener(`keydown`, this.newCommentSubmitHandler);
  }

  removeCommentHandler() {
    document.removeEventListener(`keydown`, this.newCommentSubmitHandler);
  }

  newCommentSubmitHandler(evt) {
    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    const isCtrlAndEnterPressed = evt.ctrlKey && evt.key === `Enter`;

    const isEmojiChosen = this.getElement().querySelector(`.film-details__add-emoji-label img`) ? this.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emojiType : false;

    const isTextWritten = textarea.value;

    if (isCtrlAndEnterPressed && (!isEmojiChosen || !isTextWritten)) { // если чего-то нет, потрясём окно (валидация)
      textarea.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
      textarea.style.border = `1px solid red`;

      setTimeout(() => {
        textarea.style.animation = ``;
      }, SHAKE_ANIMATION_TIMEOUT); // удаляем анимацию через 0.6 сек
    } else if (isCtrlAndEnterPressed && isEmojiChosen && isTextWritten) { // если всё правильно заполнено, добавляем коммент
      textarea.style.border = ``;
      textarea.disabled = true;

      const comment = {
        'emotion': this.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emojiType,
        'comment': textarea.value,
        'date': new Date().toISOString(),
      };
      this._callback(comment);
    }
  }
}
