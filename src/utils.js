export const noop = () => {};
export const qs = (selector, scope = window.document) => {
  return scope.querySelector(selector);
};
export const qsa = (selector, scope = window.document) => {
  return scope.querySelectorAll(selector);
};
export const on = (target, type, callback = noop, useCapture = false) => {
  target.addEventListener(type, callback, !!useCapture);
};
export const replaceAll = (target, search, replacement) =>
  target.replace(new RegExp(search, "g"), replacement);
export const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
export const escapeHtmlChar = chr => htmlEscapes[chr];
export const reUnescapedHtml = /[&<>"'`]/g;
export const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);
export const escape = string =>
  string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
