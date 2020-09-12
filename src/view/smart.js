import BaseComponent from "./base-component.js";

export default class Smart extends BaseComponent {
  constructor() {
    super();
    this._data = {};
  }

  restoreHandlers() {
    throw new Error(`Red threat`);
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this._element = null;

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
    prevElement = null;

  }

  updateData(update, isOnlyData) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (isOnlyData) {
      return;
    }

    this.updateElement();
  }
}
