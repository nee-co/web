module.exports = (s) => {
    let parser = new DOMParser()
    let document = parser.parseFromString(s, "text/html")

    for (let name of ["iframe", "script"])
    for (let e of document.querySelectorAll(name))
        e.parentElement.replaceChild(
            document.createTextNode(e.outerHTML),
            e
        )

    for (let e of document.querySelectorAll("*"))
    for (let a of e.attributes)
    if  (/^on.+?$/.test(a.name))
        e.removeAttribute(a.name)

    for (let name of ["action", "href", "src"])
    for (let e of document.querySelectorAll("*[" + name + "]"))
    if  (/^\s*javascript:/.test(name))
        e.removeAttribute(name)

    return document.documentElement.innerHTML
}
