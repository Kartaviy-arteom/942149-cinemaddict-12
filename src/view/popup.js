import {formatDate} from "../utils/card.js";
import Smart from "./smart.js";

const createPopupTemplate = (data) => {
  const {title, poster, description, comments, ratingValue, productionData, runtime, genre, director, writers, country, ageRate, isInWatchList, isInWatched, isInFavorites, actors, userComment, emoji} = data;

  const createGenreList = () => {
    return genre.map((genreType) => `<span class="film-details__genre">${genreType}</span>`).join(``);
  };

  const createCommentListContent = () => {
    return comments.map((comment) =>
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${formatDate(comment.data, `YYYY/MM/DD HH:mm`)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    ).join(``);
  };

  const genreLabel = genre.length > 1 ? `Genres` : `Genre`;

  const genreList = createGenreList();
  const commentListContent = createCommentListContent();

  const watchlistInputAttr = isInWatchList ? `checked` : ` `;
  const watchedInputAttr = isInWatched ? `checked` : ` `;
  const favoritesInputAttr = isInFavorites ? `checked` : ` `;

  return (`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRate}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${ratingValue}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatDate(productionData, `DD MMMM yyyy`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreLabel}</td>
                <td class="film-details__cell">${genreList}</td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistInputAttr}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedInputAttr}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoritesInputAttr}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentListContent}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
              ${emoji ? `<img src="images/emoji/${emoji.split(`emoji-`).join(``)}.png" width="55" height="55" alt="emoji-smile">` : ``}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${!userComment ? `` : userComment}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};

export default class Popup extends Smart {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._data = Popup.parseFilmToData(filmData);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);

    this._onUserCommentInput = this._onUserCommentInput.bind(this);
    this._onFavoritesClick = this._onFavoritesClick.bind(this);
    this._OnWatchedClick = this._onWatchedClick.bind(this);
    this._onWatchingListClick = this._onWatchingListClick.bind(this);
    this._onEmojiListClick = this._onEmojiListClick.bind(this);

    this._setInnerHandlers();
    this.restoreHandlers();
  }

  _getTemplate() {
    return createPopupTemplate(this._data);
  }

  _onCloseBtnClick(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick(Popup.parseDataToFilm(this._data));
  }

  setOnCloseBtnClick(callback) {
    this._callback.closeBtnClick = callback;
    this._closeBtn = this.getElement().querySelector(`.film-details__close-btn`);
    this._closeBtn.addEventListener(`click`, this._onCloseBtnClick);
  }

  removeOnCloseBtnClick() {
    this._closeBtn.removeEventListener(`click`, this._onCloseBtnClick);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._callback.watchListClick);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._callback.watchedClick);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._callback.favoritesClick);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          userComment: null,
          emoji: null,
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.userComment;
    delete data.emoji;

    return data;
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._onUserCommentInput);
    this.setFavoritesClickHandler(this._onFavoritesClick);
    this.setWatchedClickHandler(this._OnWatchedClick);
    this.setWatchListClickHandler(this._onWatchingListClick);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._onEmojiListClick);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setOnCloseBtnClick(this._callback.closeBtnClick);
  }

  _onUserCommentInput(evt) {
    evt.preventDefault();
    this.updateData({
      userComment: evt.target.value
    }, true);
  }

  _onFavoritesClick() {
    this.updateData({
      isInFavorites: !this._data.isInFavorites
    }, true);
  }

  _onWatchedClick() {
    this.updateData({
      isInWatched: !this._data.isInWatched
    }, true);
  }

  _onWatchingListClick() {
    this.updateData({
      isInWatchList: !this._data.isInWatchList
    }, true);
  }

  _onEmojiListClick(evt) {
    if (evt.target.classList.contains(`film-details__emoji-item`)) {
      this.updateData({
        emoji: evt.target.id
      }, false);
      this.getElement().querySelector(`#${this._data.emoji}`).checked = `checked`;
    }
  }
}
