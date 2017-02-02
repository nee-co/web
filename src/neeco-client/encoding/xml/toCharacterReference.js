module.exports = (x) =>
    Array.from(x)
        .map((a) =>
            "&#x"
          + a.charCodeAt(0).toString(16)
          + ";"
        )
        .join("")
