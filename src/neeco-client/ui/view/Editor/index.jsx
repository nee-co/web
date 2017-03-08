let isIn            = require("neeco-client/core/isIn")
let FlowContent     = require("neeco-client/encoding/html/FlowContent")
let PhrasingContent = require("neeco-client/encoding/html/PhrasingContent")
let isDescendantOf  = require("neeco-client/dom/isDescendantOf")
let listElementsIn  = require("neeco-client/dom/listElementsIn")
let listTextNodesIn = require("neeco-client/dom/listTextNodesIn")
let parentElementOf = require("neeco-client/dom/parentElementOf")
let sanitize        = require("neeco-client/encoding/html/sanitize")
let toHTML          = require("neeco-client/encoding/html/toHTML")
let React           = require("react")
let ReactDOM        = require("react-dom")
let ListItem        = require("react-material/ui/view/ListItem")
let MaterialIcon    = require("react-material/ui/view/MaterialIcon")
let ToggleButton    = require("react-material/ui/view/ToggleButton")
let DropdownButton  = require("react-material/ui/view/form/DropdownButton")

let classNames = require("neeco-client/ui/view/Editor/classNames")

let getComputedStyle = x =>
    document.defaultView.getComputedStyle(x)

let splitTextNode = x => {
    let range = x.cloneRange()

    let nodes = [x.startContainer, x.endContainer]
    
    let offsets = [x.startOffset, x.endOffset]

    if (nodes[0] == nodes[1] && nodes[0].nodeType == Node.TEXT_NODE) {
        if (offsets[1] < nodes[0].length)
            nodes[0].splitText(offsets[1])

        let node =
            offsets[0] > 0 ? nodes[0].splitText(offsets[0])
          :                  nodes[0]

        range.setStartBefore(node)
        range.setEndAfter(node)
    } else {
        range.setStartBefore(
            nodes[0].nodeType != Node.TEXT_NODE ? nodes[0].childNodes[offsets[0]]
          : offsets[0] > 0                      ? nodes[0].splitText(offsets[0])
          :                                       nodes[0]
        )

        range.setEndAfter(
            nodes[1].nodeType != Node.TEXT_NODE ? nodes[1].childNodes[offsets[1] - 1]
          : offsets[1] < nodes[1].length        ? nodes[1].splitText(offsets[1]) && nodes[1]
          :                                       nodes[1]
        )
    }

    return range
}

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            addStyleToInline: undefined,
            addStyleToBlock : undefined,
            styles      : [],
            ranges      : [],
            onPress     : undefined,
            onSelect    : e => {
                let selection = window.getSelection()

                let elements = listElementsIn(selection)

                if (elements.some(x => !isIn(x, e.currentTarget)))
                    return

                let root = e.currentTarget

                let parent = parentElementOf(e.currentTarget)

                let onPress = e => {
                    window.removeEventListener("click", onPress, false)

                    this.setState({
                        onPress: undefined,
                        styles : isIn(e.target, parent) ? this.state.styles
                               :                          []
                    })
                }

                window.addEventListener("click", onPress, false)

                this.setState({
                    onPress   : onPress,
                    ranges    :
                        Array.from(new Array(selection.rangeCount).keys())
                            .map(i => selection.getRangeAt(i).cloneRange()),
                    styles    : elements.map(getComputedStyle),
                    applyStyle: (name, value) => {
                        let ranges = this.state.ranges
                            .map(splitTextNode)
                            .map(range => {
                                let textNodes = listTextNodesIn(range)
                                    .filter(x => getComputedStyle(parentElementOf(x))[name] != value)

                                let childrenIsInRanges = x =>
                                    Array.from(x.childNodes)
                                        .every(x => isIn(x, range))

                                let summaryElements = Array.from(new Set(textNodes.map(parentElementOf)))
                                    .filter(x => x != root)
                                    .filter(childrenIsInRanges)

                                let newElements = textNodes
                                    .filter(x => !summaryElements.some(y => isIn(x, y)))
                                    .map(x => {
                                        let y = document.createElement("span")

                                        parentElementOf(x).insertBefore(y, x)

                                        y.appendChild(x)

                                        return y
                                    })

                                summaryElements
                                    .concat(newElements)
                                    .forEach(x => {
                                        x.style[name] = value
                                    })
                                
                                root.normalize()

                                return range
                            }
                        )
                    }
                })
            }
        })
    }

    componentWillUnmount() {
        if (this.state.onPress)
            window.removeEventListener("click", this.state.onPress, false)
    }

    render() {
        let {
            defaultValue,
            id,
            name,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        classNames.Host,
                        this.state.ranges ? classNames.Focus
                      :                     undefined
                    ].join(" ")
                }
            >
                <input
                    id={id}
                    name={name}
                    defaultValue={toHTML(defaultValue)}
                />
                <div
                    className={classNames.Toolbar}
                >
                    <DropdownButton
                        disabled={this.state.styles.length == 0}
                        editable
                        onChange={x => {
                            if (this.state.styles.length)
                                this.state.addStyleToInline("fontSize", x + "px")
                        }}
                        value={
                            this.state.styles.length
                         && this.state.styles.every(x => x.fontSize == this.state.styles[0].fontSize) 
                                ? parseFloat(this.state.styles[0].fontSize)
                                : ""
                        }
                    >
                        {[10, 10.5, 11, 12, 14, 16, 18, 24, 32, 48]
                            .map(x =>
                                <ListItem
                                    key={x}
                                >
                                    {x}
                                </ListItem>
                            )
                        }
                    </DropdownButton>
                    <ToggleButton
                        children={"format_bold"}
                        component={MaterialIcon}
                        disabled={this.state.styles.length == 0}
                        onClick={e => {
                            if (this.state.styles.length) {
                                if (this.state.styles.every(x => x.fontWeight == "bold"))
                                    this.state.applyStyle("fontWeight", "normal")
                                else
                                    this.state.applyStyle("fontWeight", "bold")
                            }
                        }}
                        selected={this.state.styles.every(x => x.fontWeight == "bold")}
                    />
                    <ToggleButton
                        children={"format_italic"}
                        component={MaterialIcon}
                        disabled={this.state.styles.length == 0}
                        onClick={e => {
                            if (this.state.styles.length) {
                                if (this.state.styles.every(x => x.fontStyle == "italic"))
                                    this.state.applyStyle("fontStyle", "normal")
                                else
                                    this.state.applyStyle("fontStyle", "italic")
                            }
                        }}
                        selected={this.state.styles.every(x => x.fontStyle == "italic")}
                    />
                    <ToggleButton
                        children={"format_underlined"}
                        component={MaterialIcon}
                        disabled={this.state.styles.length == 0}
                        onClick={e => {
                            if (this.state.styles.length) {
                                if (this.state.styles.every(x => x.textDecoration == "underline"))
                                    this.state.applyStyle("textDecoration", "none")
                                else
                                    this.state.applyStyle("textDecoration", "underline")
                            }
                        }}
                        selected={this.state.styles.every(x => x.textDecoration == "underline")}
                    />
                    <ToggleButton
                        children={"format_color_text"}
                        component={MaterialIcon}
                        disabled={this.state.styles.length == 0}
                    />
                    <ToggleButton
                        children={"format_align_left"}
                        component={MaterialIcon}
                        disabled={this.state.styles.length == 0}
                        onClick={e => {
                            if (this.state.styles.length)
                                this.state.addStyleToBlock("textAlign", "left")
                        }}
                        selected={this.state.styles.every(x => x.textAlign == "left")}
                    />
                    <ToggleButton
                        children={"format_align_center"}
                        component={MaterialIcon}
                        disabled={this.state.styles.length == 0}
                        onClick={e => {
                            if (this.state.styles.length)
                                this.state.addStyleToBlock("textAlign", "center")
                        }}
                        selected={this.state.styles.every(x => x.textAlign == "center")}
                    />
                    <ToggleButton
                        children={"format_align_right"}
                        component={MaterialIcon}
                        disabled={this.state.styles.length == 0}
                        onClick={e => {
                            if (this.state.styles.length)
                                this.state.addStyleToBlock("textAlign", "right")
                        }}
                        selected={this.state.styles.every(x => x.textAlign == "right")}
                    />
                </div>
                <div
                    className={classNames.Content}
                    contentEditable
                    dangerouslySetInnerHTML={{
                        __html: toHTML(sanitize(defaultValue))
                    }}
                    onInput={e => {
                        let x = e.currentTarget

                        listElementsIn(parentElementOf(x))[0].value = x.innerHTML
                    }}
                    onSelect={this.state.onSelect}
                    suppressContentEditableWarning={true}
                />
            </div>
        )
    }
}

