module.exports = image => {
    let canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height

    let context = canvas.getContext("2d")

    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    return context.getImageData(0, 0, canvas.width, canvas.height)
}
