module.exports = ({
    imageData,
    ratio
}) => {
    let canvas1 = document.createElement("canvas")
    canvas1.width = imageData.width
    canvas1.height = imageData.height
    canvas1.getContext("2d").putImageData(imageData, 0, 0)

    let canvas2 = document.createElement("canvas")
    canvas2.width = imageData.width * ratio[0]
    canvas2.height = imageData.height * ratio[1]

    let context = canvas2.getContext("2d")
    context.drawImage(canvas1, 0, 0, canvas2.width, canvas2.height)

    return context.getImageData(0, 0, canvas2.width, canvas2.height)
}
