let isIn = (a, A) => {
    let FlowContent     = require("neeco-client/encoding/html/FlowContent")
    let PhrasingContent = require("neeco-client/encoding/html/PhrasingContent")

    return (
        A == Boolean ?
          typeof(a) == "boolean"

      : A == Number ?
          typeof(a) == "number"

      : A == String ?
          typeof(a) == "string"

      : A == Function ?
          a instanceof Function

      : isIn(a, Function) && isIn(A, Function) ?
          a.prototype instanceof A

      : isIn(A, Function) ?
          a instanceof A

      : isIn(A, Array) ?
          A.some(a2 => a2 == a)

      : isIn(a, String) && isIn(A, RegExp) ?
          A.test(a)

      : isIn(a, Element) && isIn(A, String) ?
          isIn(a, a.parentNode.querySelectorAll(A))

      : isIn(a, Element) && A == FlowContent ?
          FlowContent.contains(a)

      : isIn(a, Element) && A == PhrasingContent ?
          PhrasingContent.contains(a)

      : isIn(a, Node) && isIn(A, Node) ?
          A.contains(a)

      : isIn(a, Node) && isIn(A, Range) ? (() => {
            let nodes = [
                A.startContainer.nodeType == Node.TEXT_NODE ? A.startContainer
              :                                               A.startContainer.childNodes[A.startOffset],
                A.endContainer.nodeType == Node.TEXT_NODE ? A.endContainer
              :                                             A.endContainer.childNodes[A.endOffset - 1]
            ]

            let positions = nodes.map(x => a.compareDocumentPosition(x))

            console.log(a, nodes, positions)

            return (
                nodes.some(x => isIn(a, x))
             || (
                    positions[0] == Node.DOCUMENT_POSITION_PRECEDING
                 && positions[1] == Node.DOCUMENT_POSITION_FOLLOWING
                )
             || positions.some(
                    x =>
                        x & Node.DOCUMENT_POSITION_CONTAINS
                     || (
                            x & Node.DOCUMENT_POSITION_CONTAINED_BY
                         && Array.from(a.childNodes).every(x => isIn(x, A))
                        )
                )
            )
      })()

      : isIn(A, NodeList) ?
          isIn(a, Array.from(A))

      :
          (() => {throw new TypeError()})()
    )
}

module.exports = isIn
