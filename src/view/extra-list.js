import {createElement} from "../utils.js";

const createExtraListTemplate = (cardsTemplate, title) => {
  return (`<section class="films-list--extra">
            <h2 class="films-list__title">${title}</h2>
            <div class="films-list__container">
              ${cardsTemplate}
            </div>
          </section>`);
};

export default class ExtraList {
  constructor(cardsTemplate, blockTiltle) {
    this._element = null;
    this._blockTiltle = blockTiltle;
    this._cardsTemplate = cardsTemplate;
  }

  _getTemplate() {
    return createExtraListTemplate(this._cardsTemplate, this._blockTiltle);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
