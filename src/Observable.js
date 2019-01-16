export default class Observable {
  static get validateSubscriber() {
    return sub => sub !== null;
  }

  constructor(
    value,
    options = {
      notifyImmediately: true
    }
  ) {
    this.subscribers = [];
    this._value = value;
    this.options = options;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.notify();
  }

  subscribe(subscriber = null) {
    if (!Observable.validateSubscriber(subscriber)) {
      throw new Error(`
        <Observable> error: Invalid subscriber.
      `);
    }
    this.subscribers.push(subscriber);
    if (this.options.notifyImmediately) {
      this.notify();
    }
    return this;
  }

  unsubscribe(subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notify() {
    this.subscribers.forEach(subscriber => {
      subscriber(this.value);
    });
  }
}
