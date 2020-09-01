import BaseComponent from "./base-component.js";

const createNoCardTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoData extends BaseComponent {
  _getTemplate() {
    return createNoCardTemplate();
  }
}
