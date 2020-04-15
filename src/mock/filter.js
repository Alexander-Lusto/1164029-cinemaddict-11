const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];
const filterTegs = [`all`, `watchlist`, `history`, `favorites`];

const calculateCount = (filterName, filmsArray) => {
  let count;

  switch (filterName) {
    case `All movies`:
      count = filmsArray.length;
      break;
    case `Watchlist`:
      count = filmsArray.filter((it) => it.isInWatchlist).length;
      break;
    case `History`:
      count = filmsArray.filter((it) => it.isInHistory).length;
      break;
    case `Favorites`:
      count = filmsArray.filter((it) => it.isInHistory).length;
      break;
  }
  return count;
};

export const generateFilters = (filmsArray) => {
  return filterNames.map((it, i) => {
    return {
      name: it,
      teg: filterTegs[i],
      count: calculateCount(filterNames[i], filmsArray),
    };
  });
};


