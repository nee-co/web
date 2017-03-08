module.exports = x =>
    Array.prototype.concat.apply(
        [],
        [x].concat(Array.from(x.querySelectorAll("*")))
            .map(x =>
                Array.from(x.childNodes)
                    .filter(x => x.nodeType == Node.TEXT_NODE)
            )
    )
