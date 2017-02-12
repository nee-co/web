module.exports = a => {
    let b = new FormData()

    for (let i in a)
    if (
        a[i] instanceof Array
     || a[i] instanceof FileList
    ) {
        for (let x of a[i])
            b.append(i, x)
    } else if (typeof(a[i]) != "undefined") {
        b.append(i, a[i])
    }

    return b
}
