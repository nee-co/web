let hueToRGB = require("neeco-client/graphics/hueToRGB")

module.exports = ([h, s, l]) => {
    if (s == 0)
        return [l, l, l].map(x => Math.round(x * 255))
    else {
        let q = l < 0.5 ? l * (1 + s)
              :           l + s - (l * s)
        let p = 2 * l - q

        return [
            hueToRGB(p, q, h + 1 / 3),
            hueToRGB(p, q, h),
            hueToRGB(p, q, h - (1 / 3))
        ]
            .map(x => Math.round(x * 255))
    }
}
