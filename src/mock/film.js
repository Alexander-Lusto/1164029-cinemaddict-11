import {MONTH_NAMES} from '../const.js';

const FILM_NAMES = [
  `Достучаться до небес`,
  `Бойцовский клуб`,
  `Грязь`,
  `Области тьмы`,
  `Волк с Уолл Стрит`,
  `Джентельмены`,
  `Зеленая книга`,
  `1+1`,
  `Джокер`,
  `Леон`,
  `Время`,
  `Великий Гэтсби`,
  `Вечное сияние чистого разума`,
  `Всегда говори "Да"`,
  `Дневник памяти`,
  `Пиджак`,
  `Патруль времени`,
  `Мгла`,
  `Сайлент Хилл`,
  `14/08`,
  `Унесённые призраками`,
  `Ходячий замок`,
  `Мой сосед Тоторо`,
];

const FILM_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const FILM_POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const FILM_COMMENTS = [
  {
    emoji: `smile`,
    text: `10 из 10, Господи!`,
    author: `Антон Логвинов`,
    date: `2019/12/31 23:59`,
  },
  {
    emoji: `angry`,
    text: `Зачем я потратил на это время???!`,
    author: `Ilya_BusinessMan2006`,
    date: `2020/01/3 06:59`,
  },
  {
    emoji: `puke`,
    text: `Актёры ужасные, режиссёрская работа отвратительная, саундтрек хуже некуда, сюжета нет. Однозначно рекомендую!`,
    author: `Movie Maker`,
    date: `2020/02/03 22:10`,
  },
  {
    emoji: `sleeping`,
    text: `Фильм хороший, но я заснул...`,
    author: `Sleep Walker`,
    date: `2020/01/09 00:35`,
  },
  {
    emoji: `smile`,
    text: `Под пивко сойдёт!`,
    author: `Юрий Хованский`,
    date: `2020/03/25 00:48`,
  },
  {
    emoji: `angry`,
    text: `У меня только два вопроса идиотам, сделавшим этот фильм: что они курили и чем они кололись?`,
    author: `Мэдисон`,
    date: `2020/03/10 23:12`,
  },
  {
    emoji: `puke`,
    text: `И есть ещё такая категория людей, которые пишут: «Да этот мудак... Ему вообще ничего не нравится,
      он по жизни недоволен, как будто месячные постоянно». Нет, мне много чего нравится, на самом деле. Мне много чего нравится,
      например, азиатки. Так что не надо так про меня говорить, я хороший.`,
    author: `Мэдисон`,
    date: `2020/03/10 23:12`,
  },
  {
    emoji: `angry`,
    text: `Да разве это кино?? Смотрите лучше фильмы со мной`,
    author: `Джейсон Стэтхэм`,
    date: `2020/03/15 15:49`,
  },
  {
    emoji: `smile`,
    text: `It's so bueatiful... I'm crying.`,
    author: `julia`,
    date: `2020/04/14 17:22`,
  },
  {
    emoji: `smile`,
    text: `Годнота, всем рекомендую.`,
    author: `Хантухова Лейла`,
    date: `2020/04/07 12:00`,
  },
  {
    emoji: `angry`,
    text: `Привет, это Навальный!`,
    author: `Алексей Навальный`,
    date: `2020/04/13 12:00`,
  },
  {
    emoji: `sleeping`,
    text: `I tried so hard and got so far, But in the end......    I was falling asleep :( `,
    author: `JustAnotherOneInternetUser`,
    date: `2020/04/07 09:45`,
  },
  {
    emoji: `puke`,
    text: `Фильм атстой! омерикосы снимать ни умеют, сморите лудше руское кино! `,
    author: `Коммунист`,
    date: `2020/03/29 22:13`,
  },
  {
    emoji: `angry`,
    text: `Моей жене не понравилось, поэтому фильм плохой!`,
    author: `ne_podkobluchnik_97`,
    date: `2020/04/14 11:45`,
  },
];

const FILM_GENRES = [
  `Ужасы`,
  `Боевик`,
  `Приключение`,
  `Мюзикл`,
  `Комедия`,
  `Триллер`,
  `Детектив`,
  `Аниме`,
  `Драмма`,
  `Мелодрамма`,
];

const FILM_DIRECTORS = [
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
  `Orson Welles`,
  `Woody Allen`,
  `Clint Eastwood`,
  `Robert Wide`,
  `Christopher Nolan`,
  `David Lynch`,
  `Peter Jackson`,
];

const FILM_WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Billy Wilder`,
  `Ethan Coen and Joel Coen`,
  `Robert Towne`,
  `Francis Ford Coppola`,
];

const FILM_ACTORS = [
  `Jack Nicholson`,
  `Tom Hardy`,
  `Joaquin Phoenix`,
  `Hugh Jackman`,
  `Bradley Cooper`,
  `Josh Brolin`,
  `Mahershala Ali`,
  `Robert Downey Jr.`,
  `Leonardo DiCaprio`,
  `Christian Bale`,
  `Johnny Depp`,
  `Brad Pitt`,
  `Andjelina Joly`
];

const FILM_COUNTRIES = [
  `США`,
  `Канада`,
  `Россия`,
  `Испания`,
  `Италия`,
  `Польша`,
  `Беларусь`,
  `Украина`,
];

const FILM_AGES = [`0+`, `6+`, `12+`, `16+`, `18+`];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getRandomArrayElements = (array, min, max) => {

  const randomMax = getRandomIntegerNumber(min, max);
  const newArray = array.slice();
  shuffleArray(newArray);
  return newArray.slice(0, randomMax);
};

const generateFilmCard = () => {
  return {
    name: getRandomArrayItem(FILM_NAMES),
    poster: getRandomArrayItem(FILM_POSTERS),
    description: getRandomArrayElements(FILM_DESCRIPTIONS, 1, 5).join(` `), // 1-5 строк
    comments: getRandomArrayElements(FILM_COMMENTS, 0, 5), // 0 - 5 комментариев
    rating: getRandomIntegerNumber(4, 10),
    year: getRandomIntegerNumber(1970, 2020),
    duration: {
      hours: getRandomIntegerNumber(1, 3),
      minutes: getRandomIntegerNumber(0, 60),
    },
    genres: getRandomArrayElements(FILM_GENRES, 1, 3),
    isInFavorites: Math.random() > 0.5,
    isInWatchlist: Math.random() > 0.5,
    isInHistory: Math.random() > 0.5,
    additional: {
      age: getRandomArrayItem(FILM_AGES),
      director: getRandomArrayItem(FILM_DIRECTORS),
      writers: getRandomArrayElements(FILM_WRITERS, 2, 2).join(`, `),
      actors: getRandomArrayElements(FILM_ACTORS, 2, 6).join(`, `),
      releaseDate: `${getRandomIntegerNumber(1, 30)} ${getRandomArrayItem(MONTH_NAMES)}`,
      country: getRandomArrayItem(FILM_COUNTRIES),
    }
  };
};

export const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export {FILM_GENRES};