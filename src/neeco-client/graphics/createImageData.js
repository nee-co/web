module.exports = image => {
    let rect = image.getBoundingClientRect()

    let canvas = document.createElement("canvas")
    canvas.width = rect.width
    canvas.height = rect.height

    let context = canvas.getContext("2d")

    context.drawImage(image, 0, 0)

    return context.getImageData(0, 0, canvas.width, canvas.height)
}
