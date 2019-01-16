import Observable from "./Observable";
import View from "./View";
import { qs, qsa, on } from "./utils";

import "./styles.css";

const $app = qs("#app");
$app.innerHTML = `
  <input type="text" id="username" placeholder="Enter username" data-model="username" />
  <input type="password" id="password" placeholder="Enter password" data-model="password" />
  <input type="city" id="city" placeholder="Enter city" data-model="city" />
  <br />
  <div id="test1"></div>
  <div id="test2"></div>
`;

(() => {
  const data = {
    username: new Observable("Jon Doe"),
    password: new Observable("123456"),
    city: new Observable("Belgrade")
  };

  Array.from(qsa("[data-model]")).forEach(el => {
    on(el, "keyup", event => {
      const { value, dataset } = event.target;
      data[dataset.model].value = value;
    });
  });

  new View({
    container: qs("#test1"),
    data,
    template: `
    <div>
      <p>Username: {{ username }}</p>
      <p>Password: {{ password }}</p>
      <p>City: {{ city }}</p>
    </div>
  `
  });

  new View({
    container: qs("#test2"),
    data,
    template: `
    <ul class="list">
      <li>Username: {{ username }}</li>
      <li>Password: {{ password }}</li>
      <li>City: {{ city }}</li>
    </ul>
  `
  });
})();
