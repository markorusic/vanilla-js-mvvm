import Bindable from "./Bindable";
import { qs, qsa, on } from "./utils";

(() => {
  const username = new Bindable("Jon Doe")
    .bind({
      element: qsa("[data-username]")
    })
    .bind({
      element: qsa("[data-username-input]"),
      attr: "value",
      event: "keyup"
    });

  on(qs("#clear"), "click", () => {
    username.value = "";
  });
})();
