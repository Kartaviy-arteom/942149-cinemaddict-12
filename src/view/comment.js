// import BaseComponent from "./base-component.js";
// import {formatDate} from "../utils/card.js";

// const createComment = ({author, comment, emotion, date}) => {
//   return (
//     `<li class="film-details__comment">
//       <span class="film-details__comment-emoji">
//         ${emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : ``}
//       </span>
//       <div>
//         <p class="film-details__comment-text">${comment}</p>
//         <p class="film-details__comment-info">
//           <span class="film-details__comment-author">${author}</span>
//           <span class="film-details__comment-day">${formatDate(date, `YYYY/MM/DD HH:mm`)}</span>
//           <button class="film-details__comment-delete">Delete</button>
//         </p>
//       </div>
//     </li>`);
// };

// export default class Comment extends BaseComponent {
//   constructor(commentData) {
//     super();
//     this._commentData = commentData;
//   }
//   _getTemplate() {
//     return createComment(this._commentData);
//   }

//   setOnDeleteBtnClick(callback) {
//     this._callback.delete = callback;
//     this.getElement().addEventListener(`click`, this._callback.delete);
//   }

//   remove() {
//     if (this._callback.delete) {
//       this.getElement().removeEventListener(`click`, this._callback.delete);
//     }
//     super.remove();
//   }
// }
