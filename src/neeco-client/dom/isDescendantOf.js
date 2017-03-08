let isIn                   = require("neeco-client/core/isIn")
let listAncestorElementsIn = require("neeco-client/dom/listAncestorElementsIn")

module.exports = (x, y) =>
    isIn(x, Node) && isIn(y, Element) ?
        isIn(y, listAncestorElementsIn(x))

  : isIn(x, Node) && isIn(y, String) ?
        listAncestorElementsIn(x).some(x => isIn(x, y))
  :
    (() => {throw new TypeError()})()
