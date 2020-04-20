import {UserTitles} from './const.js';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const getUserTitle = (films) => {
  const filmsInHistory = films.filter((it) => it.isInHistory).length;

  if (filmsInHistory >= 1 && filmsInHistory <= 10) {
    return UserTitles.NOVICE;
  } else if (filmsInHistory >= 11 && filmsInHistory <= 20) {
    return UserTitles.FAN;
  } else if (filmsInHistory >= 21) {
    return UserTitles.MOVIE_BUFF;
  } else {
    return ``;
  }
};
