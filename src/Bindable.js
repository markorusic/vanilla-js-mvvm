import Observable from "./Observable";
import { on } from "./utils";

export default class Bindable extends Observable {
  bind({ element, attr = "innerHTML", event = null }) {
    if (!element) {
      return this;
    }
    if (element instanceof NodeList) {
      Array.from(element).forEach(el => {
        this._applyBinding(el, attr, event);
      });
    } else {
      this._applyBinding(element, attr, event);
    }
    return this;
  }

  _applyBinding(element, attr, event) {
    if (event) {
      on(element, event, ({ target }) => {
        this.value = target[attr];
      });
    }
    this.subscribe(value => {
      element[attr] = value;
    });
    return this;
  }
}
