let isIn = require("neeco-client/core/isIn")

module.exports = x => {
    let range = [
        x.startContainer.nodeType == Node.TEXT_NODE ? x.startContainer
      :                                               x.startContainer.childNodes[x.startOffset],
        x.endContainer.nodeType == Node.TEXT_NODE ? x.endContainer
      :                                             x.endContainer.childNodes[x.endOffset - 1]
    ]

    let masks = [
        Node.DOCUMENT_POSITION_PRECEDING
      | Node.DOCUMENT_POSITION_CONTAINED_BY
      | Node.DOCUMENT_POSITION_CONTAINS,
        Node.DOCUMENT_POSITION_FOLLOWING
      | Node.DOCUMENT_POSITION_CONTAINED_BY
      | Node.DOCUMENT_POSITION_CONTAINS
    ]

    let indexes = Array.from({length: range.length}).map(Number.call, Number)

    let test = (x, y, mask) => 
        x == y || x.compareDocumentPosition(y) & mask

    let treeWalker = document.createTreeWalker(
        x.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: x =>
            indexes.every(i => test(x, range[i], masks[i])) ? NodeFilter.FILTER_ACCEPT
          :                                                  undefined
        },
        false
    )

    let value =
        range.every(x => x.nodeType != Node.TEXT_NODE) ? []
      : isIn(x.commonAncestorContainer, Element)       ? [x.commonAncestorContainer]
      :                                                  [x.commonAncestorContainer.parentElement]

    while (treeWalker.nextNode())
        value.push(treeWalker.currentNode)

    return value
}
