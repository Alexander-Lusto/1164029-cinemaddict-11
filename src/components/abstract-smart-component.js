import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

}
