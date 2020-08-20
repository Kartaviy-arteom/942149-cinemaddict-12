import {createFilmCard} from "./film-card.js";
import {getRandomInteger} from "../utils.js";

const CARDS_COUNT = 2;

const createRandomCardsTemplate = (films) => {
  let template = ``;
  for (let i = 0; i < CARDS_COUNT; i++) {
    template += createFilmCard(films[getRandomInteger(0, films.length - 1)]);
  }
  return template;
};

export const createExtraListTemplate = (data, title) => {

  return (`<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">
        ${createRandomCardsTemplate(data)}
      </div>
    </section>
  `);
};
