import {UserTitles} from './const.js';

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

export const getRandomDate = (yearMin, yearMax) => {
  const targetDate = new Date();
  const year = getRandomIntegerNumber(yearMin, yearMax);
  const month = getRandomIntegerNumber(1, 12);
  const day = getRandomIntegerNumber(1, 30);

  targetDate.setFullYear(year, month, day);

  return targetDate;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};


export const getRandomIntegerNumber = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};


export const shuffleArray = (array) => {

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const getRandomArrayElements = (array, min, max) => {
  const randomMax = getRandomIntegerNumber(min, max);
  const newArray = array.slice();
  shuffleArray(newArray);
  return newArray.slice(0, randomMax);
};
