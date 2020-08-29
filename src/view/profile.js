import {createElement} from "../utils.js";

const createProfileTemplate = (userStatus) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userStatus}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(statusData) {
    this._element = null;
    this._statusData = statusData;
  }

  _getTemplate() {
    return createProfileTemplate(this._statusData);
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
