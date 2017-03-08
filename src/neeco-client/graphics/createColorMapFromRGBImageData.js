module.exports = ({
    imageData,
    numberOfColors
}) => {
    let root = {
        children: [],
        color   : [0, 0, 0],
        count   : 0
    }

    let bits = Array.from(new Array(8).keys()).reverse()

    Array.from(new Array(imageData.width * imageData.height).keys())
        .map(i => i * 4)
        .map(i => [
            imageData.data[i],
            imageData.data[i + 1],
            imageData.data[i + 2]
        ])
        .forEach(color => {
            let node = bits
                .map(x =>
                    color
                        .map(a => (a >> x) & 1)
                        .reduce((a, b) => (a << 1) | b)
                )
                .reduce(
                    (x, i) => {
                        if (x.children[i])
                            return x.children[i]
                        else
                            return x.children[i] = {
                                children: [],
                                color   : [0, 0, 0],
                                count   : 0
                            }
                    },
                    root
                )

            node.color[0] += color[0]
            node.color[1] += color[1]
            node.color[2] += color[2]
            node.count += 1
        })

    while (nodes.length > numberOfColors) {
    }

    return nodes
}
