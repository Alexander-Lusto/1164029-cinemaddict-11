export const closePopup = (btn, popup) => {
  btn.addEventListener(`click`, () => {
    popup.remove();
  });

  document.addEventListener(`keydown`, (evt) => {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      popup.remove();
    }
  });
};
