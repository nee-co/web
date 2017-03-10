module.exports = ({
    imageData,
    numberOfColors
}) => {
    let root = {
        children: [],
        color   : [0, 0, 0, 0],
        count   : 0
    }

    let bits = Array.from({length: 8}).map(Number.call, Number).reverse()

    Array.from({length: imageData.width * imageData.height}).map(Number.call, Number)
        .map(i => i * 4)
        .map(i => [
            imageData.data[i],
            imageData.data[i + 1],
            imageData.data[i + 2],
            imageData.data[i + 3]
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
                                parent  : x,
                                children: [],
                                color   : [0, 0, 0, 0],
                                count   : 0
                            }
                    },
                    root
                )

            node.color[0] += color[0]
            node.color[1] += color[1]
            node.color[2] += color[2]
            node.color[3] += color[3]
            node.count += 1
        })

    while (nodes.length > numberOfColors) {
        
    }

    return nodes
}
