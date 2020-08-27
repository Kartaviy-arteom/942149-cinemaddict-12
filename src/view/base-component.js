export default class BaseComponent {
  constructor() {
    if (new.target === BaseComponent) {
      throw new Error(`Code Red. Can't instantiate BaseComponent`);
    }
  }
}
