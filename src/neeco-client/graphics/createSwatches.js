let toHSLFromRGB = require("neeco-client/graphics/toHSLFromRGB")
let toRGBFromHSL = require("neeco-client/graphics/toRGBFromHSL")
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
 
module.exports = (
    imageData,
    colorCount = 64
) => {
    let pixels = imageData.data
    let pixelCount = imageData.data.length

    let allPixels = []

    for (let i = 0; i < pixelCount; i += 4) {
        let r = pixels[i]
        let g = pixels[i + 1]
        let b = pixels[i + 2]
        let a = pixels[i + 3]

        if (
            a >= 125
         && !(r > 250 && g > 250 && b > 250)
        )
            allPixels.push([r, g, b])
    }

    console.log(allPixels)

    let colorMap = quantize(allPixels, colorCount)

    if (!colorMap)
        return

    let swatches = colorMap.vboxes.map(
        x => ({
            color     : x.color,
            population: x.vbox.count()
        })
    )

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
            let [hue, sat, luma] = toHSLFromRGB(x.color)

            if (
                sat >= minSaturation
             && sat <= maxSaturation
             && luma >= minLuma
             && luma <= maxLuma
            ) {
                let value = createComparisonValue(
                    sat,
                    targetSaturation,
                    luma,
                    targetLuma,
                    x.population,
                    HighestPopulation
                )

                if (max == undefined || value > maxValue) {
                    max = createSwatch(x.color)
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
        let hsl = toHSLFromRGB(DarkVibrantSwatch.color)
        hsl[2] = TARGET_NORMAL_LUMA
        VibrantSwatch = createSwatch(toRGBFromHSl(hsl))
    }

    if (
        DarkVibrantSwatch == undefined
     && VibrantSwatch != undefined
    ) {
        let hsl = toHSLFromRGB(VibrantSwatch.color)
        hsl[2] = TARGET_DARK_LUMA
        DarkVibrantSwatch = createSwatch(toRGBFromHSL(hsl))
    }

    return {
        Vibrant     : VibrantSwatch,
        Muted       : MutedSwatch,
        DarkVibrant : DarkVibrantSwatch,
        DarkMuted   : DarkMutedSwatch,
        LightVibrant: LightVibrantSwatch,
        LightMuted  : LightMutedSwatch
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

let createSwatch = (color) => {
    let yiq = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000

    return {
        bodyTextColor : yiq < 150 ? "#fff"
                      :             "#000",
        color         : color,
        titleTextColor: yiq < 200 ? "#fff"
                      :             "#000"
    }
}
