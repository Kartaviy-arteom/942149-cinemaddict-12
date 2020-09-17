import BaseComponent from "./base-component.js";

const createFooterStatisticsValueTemplate = (number) => {
  return (`<p>${number} movies inside</p>`);
};

export default class FooterStatistics extends BaseComponent {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }
  _getTemplate() {
    return createFooterStatisticsValueTemplate(this._quantity);
  }
}
