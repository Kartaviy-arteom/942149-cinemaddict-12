import {createElement} from "../utils.js";

const createShowMoreBtn = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class ShowMoreBtn {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createShowMoreBtn();
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
