module.exports = (p, q, t) => {
    if (t < 0)
        t += 1

    if (t > 1)
        t -= 1

    return (
        t < 1 / 6 ? p + (q - p) * 6 * t
      : t < 1 / 2 ? q
      : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6
      :             p
    )
}
