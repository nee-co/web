module.exports = (a) => {
    var b = new FormData()

    for (var i in a)
        b.append(i, a[i])

    return b
}
