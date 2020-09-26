import BaseComponent from "./base-component.js";

const UserStatus = {
  NO_STATUS: ``,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`,
};

const createProfileTemplate = (watchedFilmsCount) => {
  let userStatus;
  if (watchedFilmsCount === 0) {
    userStatus = UserStatus.NO_STATUS;
  }
  if (watchedFilmsCount > 0 && watchedFilmsCount <= 10) {
    userStatus = UserStatus.NOVICE;
  }

  if (watchedFilmsCount > 10 && watchedFilmsCount <= 20) {
    userStatus = UserStatus.FAN;
  }

  if (watchedFilmsCount > 20) {
    userStatus = UserStatus.MOVIE_BUFF;
  }
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userStatus}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
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
