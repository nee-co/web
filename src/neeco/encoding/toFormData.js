module.exports = (a) => {
    var b = new FormData()

    for (var i in a)
    if (typeof a[i] == "string")
        b.append(i, a[i])
    else
        for (var x of a[i])
            b.append(i, x)

    return b
}
