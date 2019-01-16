import { replaceAll } from "./utils";

export default class View {
  constructor({ container = null, template = "", data = {}, options = {} }) {
    this._container = container;
    this._template = template;
    this._observables = {};
    this._options = options;
    for (let key in data) {
      this.bind(key, data[key]);
    }
    this.render();
  }

  get el() {
    return this._container;
  }

  set el(value) {
    console.warn("Cannot set el");
  }

  bind(key, observable) {
    const obs = this._observables[key];
    if (obs && obs === observable) {
      return;
    }
    this._observables[key] = observable;
    const handler = () => {
      this.render();
    };
    observable.subscribe(handler);
    return () => {
      delete this._observables[key];
      observable.unsubscribe(handler);
    };
  }

  render() {
    if (this._container === null) {
      return;
    }
    let html = this._template;
    for (let key in this._observables) {
      const value = this._observables[key].value;
      html = replaceAll(html, `{{ ${key} }}`, value);
    }
    this._container.innerHTML = html;
  }
}
