import BaseComponent from "./base-component.js";
import {renderFilmCard} from "./render-film-card.js";

const createExtraListTemplate = (title) => {
  return (`<section class="films-list--extra">
            <h2 class="films-list__title">${title}</h2>
            <div class="films-list__container">

            </div>
          </section>`);
};

export default class ExtraList extends BaseComponent {
  constructor(blockTiltle, childsData) {
    super();

    this._blockTiltle = blockTiltle;
    this._childsData = childsData;
  }

  _getTemplate() {
    return createExtraListTemplate(this._blockTiltle);
  }

  getElementWithChildren() {
    const filmList = this.getElement().querySelector(`.films-list__container`);
    this._childsData.forEach((element) => {
      renderFilmCard(filmList, element);
    });

    return this._element;
  }
}
