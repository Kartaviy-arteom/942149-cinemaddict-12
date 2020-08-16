import {createElement} from "../utils.js";

const createFooterStatisticsValueTemplate = (movies) => {
  return (`<p>${movies.length} movies inside</p>`);
};

export default class FooterStatistics {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  _getTemplate() {
    return createFooterStatisticsValueTemplate(this._films);
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
