import BaseComponent from "./base-component.js";

const createProfileTemplate = (userStatus) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userStatus}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends BaseComponent {
  constructor(statusData) {
    super();
    this._statusData = statusData;
  }

  _getTemplate() {
    return createProfileTemplate(this._statusData);
  }
}
