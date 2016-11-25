module.exports = (a) => {
    var b = ""

    for (var i in a)
        b += encodeURIComponent(i) + "='" + encodeURIComponent(a[i]) + "'&"

    return b.slice(0, -1)
}
