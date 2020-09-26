import ProfileView from "../view/profile.js";
import {RenderPosition, render} from "../utils/render.js";

export default class Profile {
  constructor(parentElement, filmsModel) {
    this._parentElement = parentElement;
    this._filmsModel = filmsModel;
    this._profileView = null;
    this._watchedFilmCount = 0;
    this.init = this.init.bind(this);
    this._filmsModel.addObserver(this.init);
  }

  _getWatchedFilms() {
    this._watchedFilmCount = this._filmsModel.getFilms().slice().filter((film) => film.isInWatched).length;
  }

  init() {
    this._getWatchedFilms();
    this._prevProfileView = this._profileView;

    this._profileView = new ProfileView(this._watchedFilmCount);

    if (this._prevProfileView) {
      this._prevProfileView.remove();
      this._prevProfileView = null;
    }

    render(this._parentElement, this._profileView, RenderPosition.BEFOREEND);
  }
}
