let listElementsInRange = require("neeco-client/dom/listElementsInRange")

module.exports = x =>
    Array.prototype.concat.apply(
        [],
        Array.from(new Array(x.rangeCount).keys())
            .map(i => x.getRangeAt(i))
            .map(listElementsInRange)
    )
