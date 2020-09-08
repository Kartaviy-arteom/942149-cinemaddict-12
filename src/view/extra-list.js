export const createExtraListTemplate = (cardsTemplate, title) => {

  return (`<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
        ${cardsTemplate}
      </div>
    </section>
  `);
};
