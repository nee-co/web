module.exports = a =>
    Array.from(Object.entries(a))
        .filter(([i, x]) => x != undefined)
        .map(([i, x]) => encodeURIComponent(i) + "=" + encodeURIComponent(x))
        .join("&")
