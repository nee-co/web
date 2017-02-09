module.exports = ({
    imageData,
    size,
}) => {
    let canvas = document.createElement("canvas")
    canvas.width = imageData.width
    canvas.height = imageData.height

    let context = canvas.getContext("2d")
    context.putImageData(imageData, 0, 0)
    context.scale(
        size[0] / imageData.width,
        size[1] / imageData.height
    )

    return context.getImageData(
        0,
        0,
        size[0],
        size[1]
    )
}
