import BaseComponent from "./base-component.js";

const createExtraListTemplate = (title) => {
  return (`<section class="films-list--extra">
            <h2 class="films-list__title">${title}</h2>
            <div class="films-list__container">

            </div>
          </section>`);
};

export default class ExtraList extends BaseComponent {
  constructor(blockTiltle) {
    super();
    this._blockTiltle = blockTiltle;
  }

  _getTemplate() {
    return createExtraListTemplate(this._blockTiltle);
  }

  getFilmList() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
