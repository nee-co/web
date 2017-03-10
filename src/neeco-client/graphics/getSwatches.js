let rgbToHSL = require("neeco-client/graphics/rgbToHSL")
let hslToRGB = require("neeco-client/graphics/hslToRGB")
let quantize     = require("quantize")

let TARGET_DARK_LUMA = .26

let MAX_DARK_LUMA = .45

let MIN_LIGHT_LUMA = .55

let TARGET_LIGHT_LUMA = .74

let MIN_NORMAL_LUMA = .3

let TARGET_NORMAL_LUMA = .5

let MAX_NORMAL_LUMA = .7

let TARGET_MUTED_SATURATION = 0.3

let MAX_MUTED_SATURATION = .4

let TARGET_VIBRANT_SATURATION = 1

let MIN_VIBRANT_SATURATION = .35

let WEIGHT_SATURATION = 3

let WEIGHT_LUMA = 6

let WEIGHT_POPULATION = 1

let HighestPopulation = 0
 
module.exports = ({
    imageData,
    colorCount = 64
}) => {
    let data = window.data = imageData.data

    let pixels = Array.from({length: data.length / 4}).map(Number.call, Number)
        .map(i => i * 4)
        .map(i => [
            data[i],
            data[i + 1],
            data[i + 2],
            data[i + 3]
        ])
        .filter(([r, g, b, a]) =>
            a >= 125
         && !(r > 250 && g > 250 && b > 250)
        )
        .map(x => x.slice(0, 3))

    let colorMap = quantize(pixels, colorCount)

    if (!colorMap)
        return {}
    
    let swatches = colorMap.vboxes.map(
        x => ({
            color     : x.color,
            population: x.vbox.count()
        })
    )

    console.log(swatches.some(x => x.color.some(x => x % 1 === 0)))

    let maxPopulation = swatches.reduce((x, a) => Math.max(x, a.population), 0)

    let isAlreadySelected = x =>
        VibrantSwatch == x
     || DarkVibrantSwatch == x
     || LightVibrantSwatch == x
     || MutedSwatch == x
     || DarkMutedSwatch == x
     || LightMutedSwatch == x

    let findColorVariation = (
        targetLuma,
        minLuma,
        maxLuma,
        targetSaturation,
        minSaturation,
        maxSaturation
    ) => {
        let max = undefined
        let maxValue = 0

        for (let x of swatches) {
            let [h, s, l] = rgbToHSL(x.color)

            if (
                s >= minSaturation
             && s <= maxSaturation
             && l >= minLuma
             && l <= maxLuma
             && !isAlreadySelected(x)
            ) {
                let value = createComparisonValue(
                    s,
                    targetSaturation,
                    l,
                    targetLuma,
                    x.population,
                    HighestPopulation
                )

                if (max == undefined || value > maxValue) {
                    max = x
                    maxValue = value
                }
            }
        }

        return max
    }

    let VibrantSwatch = findColorVariation(
        TARGET_NORMAL_LUMA, 
        MIN_NORMAL_LUMA,
        MAX_NORMAL_LUMA,
        TARGET_VIBRANT_SATURATION,
        MIN_VIBRANT_SATURATION,
        1
    )

    console.log(VibrantSwatch)

    let LightVibrantSwatch = findColorVariation(
        TARGET_LIGHT_LUMA,
        MIN_LIGHT_LUMA,
        1,
        TARGET_VIBRANT_SATURATION,
        MIN_VIBRANT_SATURATION,
        1
    )

    let DarkVibrantSwatch = findColorVariation(
        TARGET_DARK_LUMA,
        0,
        MAX_DARK_LUMA,
        TARGET_VIBRANT_SATURATION,
        MIN_VIBRANT_SATURATION,
        1
    )

    let MutedSwatch = findColorVariation(
        TARGET_NORMAL_LUMA,
        MIN_NORMAL_LUMA,
        MAX_NORMAL_LUMA,
        TARGET_MUTED_SATURATION,
        0,
        MAX_MUTED_SATURATION
    )

    let LightMutedSwatch = findColorVariation(
        TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA,
        1,
        TARGET_MUTED_SATURATION,
        0,
        MAX_MUTED_SATURATION
    )

    let DarkMutedSwatch = findColorVariation(
        TARGET_DARK_LUMA,
        0,
        MAX_DARK_LUMA,
        TARGET_MUTED_SATURATION,
        0,
        MAX_MUTED_SATURATION
    )

    if (
        VibrantSwatch == undefined
     && DarkVibrantSwatch != undefined
    ) {
        let hsl = rgbToHSL(DarkVibrantSwatch.color)
        hsl[2] = TARGET_NORMAL_LUMA

        VibrantSwatch = {
            color: hslToRGB(hsl)
        }
    }

    if (
        DarkVibrantSwatch == undefined
     && VibrantSwatch != undefined
    ) {
        let hsl = VibrantSwatch.color
        hsl[2] = TARGET_DARK_LUMA

        DarkVibrantSwatch = {
            color: hslToRGB(hsl)
        }
    }

    return {
        Vibrant     : VibrantSwatch && VibrantSwatch.color,
        Muted       : MutedSwatch && MutedSwatch.color,
        DarkVibrant : DarkVibrantSwatch && DarkVibrantSwatch.color,
        DarkMuted   : DarkMutedSwatch && DarkMutedSwatch.color,
        LightVibrant: LightVibrantSwatch && LightVibrantSwatch.color,
        LightMuted  : LightMutedSwatch && LightMutedSwatch.color
    }
}

let createComparisonValue = (
    saturation,
    targetSaturation,
    luma,
    targetLuma,
    population,
    maxPopulation
) =>
    weightedMean(
        invertDiff(saturation, targetSaturation),
        WEIGHT_SATURATION,
        invertDiff(luma, targetLuma),
        WEIGHT_LUMA,
        population / maxPopulation,
        WEIGHT_POPULATION
    )

let invertDiff = (value, targetValue) =>
    1 - Math.abs(value - targetValue)

let weightedMean = values => {
    let sum = 0
    let sumWeight = 0
    let i = 0

    while (i < values.length) {
        let value = values[i]
        let weight = values[i + 1]

        sum += value * weight
        sumWeight += weight

        i += 2
    }
        
    sum / sumWeight
}
