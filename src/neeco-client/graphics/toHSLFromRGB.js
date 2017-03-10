let toRGBFromHue = require("neeco-client/graphics/toRGBFromHue")

module.exports = ([h, s, l]) => {
    let r = undefined
    let g = undefined
    let b = undefined

    if (s == 0)
        r = g = b = l
    else {
        let q = l < 0.5 ? l * (1 + s)
              :           l + s - (l * s)
        let p = 2 * l - q

        r = toRGBFromHue(p, q, h + 1 / 3)
        g = toRGBFromHue(p, q, h)
        b = toRGBFromHue(p, q, h - (1 / 3))
    }
        
    return [r * 255, g * 255, b * 255]
}