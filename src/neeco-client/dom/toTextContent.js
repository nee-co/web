module.exports = x => {
    let parser = new DOMParser()

    let document = parser.parseFromString(x, "text/html")

    return document.documentElement.textContent
}