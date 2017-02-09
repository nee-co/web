let resize   = require("neeco-client/graphics/resize")
let quantize = require("neeco-client/graphics/quantize")

let MIN_CONTRAST_TITLE_TEXT = 3.0
let MIN_CONTRAST_BODY_TEXT = 4.5

let test = {
    lightness: {
        light: [
            .55,
            .74,
            1
        ],
        default: [
            .3,
            .5,
            .7
        ],
        dark: [
            0,
            .26,
            .45
        ]
    },
    saturation: {
        vibrant: [
            .35,
            1,
            1
        ],
        muted: [
            0,
            .3,
            .4
        ]
    },
    weight: [
        .24,
        .24,
        .52
    ]
}

let default_area = 112 * 112

module.exports = ({
    imageData
}) => {
    let factor = Math.min(
        1,
        Math.sqrt(default_area / (imageData.width * imageData.height))
    )

    let resizedImageData = resize({
        imageData: imageData,
        size     : [
            Math.ceil(imageData.width * factor),
            Math.ceil(imageData.height * factor)
        ]
    })

    let colors = quantize({
        imageData       : resizedImageData,
        number_of_colors: 16
    })

    return ({
        vibrant,
        vibrantDark,
        vibrantLight,
        muted,
        mutedDark,
        mutedLight
    })
}
