let listTextNodesInElement = require("neeco-client/dom/listTextNodesInElement")
let listTextNodesInRange   = require("neeco-client/dom/listTextNodesInRange")

module.exports = x =>
    x instanceof Element ? listTextNodesInElement(x)
  : x instanceof Range   ? listTextNodesInRange(x)
  :                        (() => {throw new TypeError()})()

