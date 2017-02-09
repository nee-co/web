module.exports = a =>
    Array.from(Object.entries(a))
        .map(([i, x]) => encodeURIComponent(i) + "=" + encodeURIComponent(x))
        .join("&")
