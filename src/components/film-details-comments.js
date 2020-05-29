import AbstractSmartComponent from "./abstract-smart-component";
import moment from 'moment';
import he from 'he';

const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    return (
      `
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
              </span>
              <div>
                <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
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

const createFilmDetailsCommentsTemplate = (comments) => {
  const commentsMarkup = createCommentsMarkup(comments);

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : `0`} </span></h3>
        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>
      </section>`
  );
};

export default class FilmDetailsComments extends AbstractSmartComponent {
  constructor(commentsModel) {
    super();

    this._comments = commentsModel.getComments();
  }

  getTemplate() {
    return createFilmDetailsCommentsTemplate(this._comments);
  }

  setDeleteButtonHandler(callback) {
    const deleteButtons = Array.from(this.getElement().querySelectorAll(`.film-details__comment-delete`));
    deleteButtons.forEach((button, index) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.target.disabled = true;
        evt.target.textContent = `Deleting...`;
        callback(index);
      });
    });
  }
}
