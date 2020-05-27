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
  }

  addComment(comment) {
    this._comments = this._comments.concat(comment).sort((a, b) => Number(a.id) < Number(b.id));
    this._callHandlers(this._dataChangeHandlers);
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

  removeComment(id) {
    /* const oldComments = this._comments;
    const newComments = cloneDeep(this._comments);
    newComment.comments.splice(index, 1);
    this._onCommentsChange(this, oldComments, newComments, film); */
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
