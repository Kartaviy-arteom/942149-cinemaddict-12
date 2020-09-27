import {createElement} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

export default class BaseComponent {
  constructor() {
    if (new.target === BaseComponent) {
      throw new Error(`Code Red. Can't instantiate BaseComponent`);
    }

    this._element = null;
    this._callback = {};
  }

  _getTemplate() {
    throw new Error(`method not implemented`);
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

  remove() {
    this.getElement().remove();
    this.removeElement();
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      if (callback) {
        callback();
      }
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
