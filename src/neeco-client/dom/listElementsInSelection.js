let listElementsInRange = require("neeco-client/dom/listElementsInRange")

module.exports = x =>
    Array.prototype.concat.apply(
        [],
        Array.from({length: x.rangeCount}).map(Number.call, Number)
            .map(i => x.getRangeAt(i))
            .map(listElementsInRange)
    )
