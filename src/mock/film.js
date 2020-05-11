import {getRandomDate, getRandomArrayElements, getRandomArrayItem, getRandomIntegerNumber} from '../utils.js';

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
    date: getRandomDate(),
  },
  {
    emoji: `angry`,
    text: `Зачем я потратил на это время???!`,
    author: `Ilya_BusinessMan2006`,
    date: getRandomDate(),
  },
  {
    emoji: `puke`,
    text: `Актёры ужасные, режиссёрская работа отвратительная, саундтрек хуже некуда, сюжета нет. Однозначно рекомендую!`,
    author: `Movie Maker`,
    date: getRandomDate(),
  },
  {
    emoji: `sleeping`,
    text: `Фильм хороший, но я заснул...`,
    author: `Sleep Walker`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `smile`,
    text: `Под пивко сойдёт!`,
    author: `Юрий Хованский`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `angry`,
    text: `У меня только два вопроса идиотам, сделавшим этот фильм: что они курили и чем они кололись?`,
    author: `Мэдисон`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `puke`,
    text: `И есть ещё такая категория людей, которые пишут: «Да этот мудак... Ему вообще ничего не нравится,
      он по жизни недоволен, как будто месячные постоянно». Нет, мне много чего нравится, на самом деле. Мне много чего нравится,
      например, азиатки. Так что не надо так про меня говорить, я хороший.`,
    author: `Мэдисон`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `angry`,
    text: `Да разве это кино?? Смотрите лучше фильмы со мной`,
    author: `Джейсон Стэтхэм`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `smile`,
    text: `It's so bueatiful... I'm crying.`,
    author: `julia`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `smile`,
    text: `Годнота, всем рекомендую.`,
    author: `Хантухова Лейла`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `angry`,
    text: `Привет, это Навальный!`,
    author: `Алексей Навальный`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `sleeping`,
    text: `I tried so hard and got so far, But in the end......    I was falling asleep :( `,
    author: `JustAnotherOneInternetUser`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `puke`,
    text: `Фильм атстой! омерикосы снимать ни умеют, сморите лудше руское кино! `,
    author: `Коммунист`,
    date: getRandomDate(2015, 2020),
  },
  {
    emoji: `angry`,
    text: `Моей жене не понравилось, поэтому фильм плохой!`,
    author: `ne_podkobluchnik_97`,
    date: getRandomDate(2015, 2020),
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

const generateFilmCard = () => {
  return {
    id: getRandomIntegerNumber(1000000000, 9999999999),
    name: getRandomArrayItem(FILM_NAMES),
    poster: getRandomArrayItem(FILM_POSTERS),
    description: getRandomArrayElements(FILM_DESCRIPTIONS, 1, 5).join(` `), // 1-5 строк
    comments: getRandomArrayElements(FILM_COMMENTS, 0, 5), // 0 - 5 комментариев
    rating: getRandomIntegerNumber(4, 10),
    releaseDate: getRandomDate(1970, 2020), // getRandomIntegerNumber(1990, 2020),
    duration: getRandomIntegerNumber(70, 180),
    genres: getRandomArrayElements(FILM_GENRES, 1, 3),
    isInFavorites: Math.random() > 0.5,
    isInWatchlist: Math.random() > 0.5,
    isInHistory: Math.random() > 0.5,
    additional: {
      age: getRandomArrayItem(FILM_AGES),
      director: getRandomArrayItem(FILM_DIRECTORS),
      writers: getRandomArrayElements(FILM_WRITERS, 2, 2).join(`, `),
      actors: getRandomArrayElements(FILM_ACTORS, 2, 6).join(`, `),
      country: getRandomArrayItem(FILM_COUNTRIES),
    }
  };
};

export const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export const getComements = (films) => {
  const array = [];
  films.forEach((film) => {
    array.push({
      id: film.id,
      comments: film.comments,
    });
  });
  return array;
};

export {FILM_GENRES};
