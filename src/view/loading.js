import BaseComponent from "./base-component.js";

const createLoadingTemplate = () => {
  return `<h2 class="films-list__title">Loading...</h2>`;
};

export default class Loading extends BaseComponent {
  _getTemplate() {
    return createLoadingTemplate();
  }
}
