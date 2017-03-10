module.exports = ([r, g, b]) => {
    r /= 255
    g /= 255
    b /= 255

    let max = Math.max(r, g, b)
    let min = Math.min(r, g, b)

    let h = undefined

    let s = undefined

    let l = (max + min) / 2

    if (max == min)
        h = s = 0
    else {
        let d = max - min

        let s = l > 0.5 ? d / (2 - max - min)
              :           d / (max + min)

        if (max == r)
            h = (g - b) / d + (g < b ? 6 : 0)
        else if (max == g)
            h = (b - r) / d + 2
        else if (max == b)
            h = (r - g) / d + 4
        
        h /= 6
    }
    
    return [h, s, l]
}