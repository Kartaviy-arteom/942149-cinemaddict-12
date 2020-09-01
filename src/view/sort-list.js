import BaseComponent from "./base-component.js";
import {sortType} from "../consts.js";

const createSortListTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${sortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${sortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${sortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortList extends BaseComponent {
  _getTemplate() {
    return createSortListTemplate();
  }
}
