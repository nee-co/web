module.exports = x => {
    let nodes = [
        x.startContainer,
        x.endContainer
    ]

    let offsets = [
        x.startOffset,
        x.endOffset
    ]

    if (
        nodes[0] == nodes[1]
     && nodes[0].nodeType == Node.TEXT_NODE
    ) {
        if (offsets[1] < nodes[0].length)
            nodes[0].splitText(offsets[1])

        return [
            offsets[0] > 0 ? nodes[0].splitText(offsets[0])
          :                  nodes[0]
        ]
    } else {
        let range = [
            nodes[0].nodeType != Node.TEXT_NODE ? nodes[0].childNodes[offsets[0]]
          : offsets[0] > 0                      ? nodes[0].splitText(offsets[0])
          :                                       nodes[0],
            nodes[1].nodeType != Node.TEXT_NODE ? nodes[1].childNodes[offsets[1] - 1]
          : offsets[1] < nodes[1].length        ? nodes[1].splitText(offsets[1]) && nodes[1]
          :                                       nodes[1]
        ]

        let masks = [
            Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING,
            Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_FOLLOWING
        ]

        let indexes = Array.from(new Array(range.length).keys())

        let test = (x, y, mask) => 
            x == y || x.compareDocumentPosition(y) & mask

        let treeWalker = document.createTreeWalker(
            x.commonAncestorContainer,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: x =>
                    indexes.every(i => test(x, range[i], masks[i])) ? NodeFilter.FILTER_ACCEPT
                  :                                                   undefined
            },
            false
        )

        let value = []

        while (treeWalker.nextNode())
            value.push(treeWalker.currentNode)

        return value
    }
}
