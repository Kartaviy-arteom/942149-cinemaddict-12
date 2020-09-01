import BaseComponent from "./base-component.js";

const createShowMoreBtn = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class ShowMoreBtn extends BaseComponent {
  constructor() {
    super();
    this._onBtnClick = this._onBtnClick.bind(this);
  }
  _getTemplate() {
    return createShowMoreBtn();
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setOnBtnClick(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._onBtnClick);
  }
}
