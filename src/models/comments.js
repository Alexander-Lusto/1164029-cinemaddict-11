export default class Comments {
  constructor() {
    this._comments = []; // база данных со всеми комментариями, когда изменяем что-то, изменяем эту базу
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  removeComment(commentId) {
    const index = this._comments.findIndex((it) => it.id === commentId);
    if (index > 0) {
      this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    } else if (index === 0) {
      this._comments = [].concat(this._comments.slice(0), this._comments.slice(index + 1));
    }

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addComment(comment) {
    this._comments = this._comments.push(comment);
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  updateComments(id, comments) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), comments, this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandler.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => {
      handler();
    });
  }
}
