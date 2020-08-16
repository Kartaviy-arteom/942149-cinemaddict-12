import {createElement} from "../utils.js";

const createExtraListTemplate = (title) => {
  return (`<section class="films-list--extra">
            <h2 class="films-list__title">${title}</h2>
            <div class="films-list__container">
            </div>
          </section>`);
};

export default class ExtraList {
  constructor(blockTiltle) {
    this._element = null;
    this._blockTiltle = blockTiltle;
  }

  _getTemplate() {
    return createExtraListTemplate(this._blockTiltle);
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
