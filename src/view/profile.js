import BaseComponent from "./base-component.js";
import {UserStatus} from "../consts.js";
import {getUserStatus} from "../utils/common.js";

const createProfileTemplate = (watchedFilmsCount) => {
  const userStatus = getUserStatus(watchedFilmsCount);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userStatus}</p>
      ${userStatus !== UserStatus.NO_STATUS ? `<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">` : ``}
    </section>`
  );
};

export default class Profile extends BaseComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  _getTemplate() {
    return createProfileTemplate(this._filmsCount);
  }
}
