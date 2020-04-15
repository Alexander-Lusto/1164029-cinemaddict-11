export const createFilterTemplate = (filtersArray) => {

  return (
    `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilterMarkup(filtersArray)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    `
  );
};

const createFilterMarkup = (filtersArray) => {

  return filtersArray.map((filter) => {
    const {teg, name, count} = filter;
    return (
      `
      <a href="#${teg}"
         class="main-navigation__item ${teg === `all` ? `main-navigation__item--active` : ``}">
         ${name}
         ${teg === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>
      `
    );
  }).join(`\n`);
};
