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
    const {address, name, count} = filter;
    return (
      `
      <a href="#${address}"
         class="main-navigation__item ${name === `All movies` ? `main-navigation__item--active` : ``}">
         ${name}
         ${name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>
      `
    );
  }).join(`\n`);
};
