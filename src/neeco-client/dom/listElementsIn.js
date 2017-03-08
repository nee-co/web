let listElementsInRange     = require("neeco-client/dom/listElementsInRange")
let listElementsInSelection = require("neeco-client/dom/listElementsInSelection")

module.exports = x =>
    x instanceof Range            ? listElementsInRange(x)
  : x instanceof Selection        ? listElementsInSelection(x)
  : x instanceof Document         ? x.querySelectorAll("*")
  : x instanceof DocumentFragment ? x.querySelectorAll("*")
  : x instanceof Element          ? x.querySelectorAll("*")
  :                                 (() => {throw new TypeError()})()
