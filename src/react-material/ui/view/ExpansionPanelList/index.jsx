let React    = require("react")
let ReactDOM = require("react-dom")
let List     = require("react-material/ui/view/List")

let classNames = require("react-material/ui/view/ExpansionPanelList/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            labelWidth: undefined
        })
    }

    componentDidMount() {
        let e = ReactDOM.findDOMNode(this)

        this.setState({
            labelWidth: Array.from(e.parentNode.querySelectorAll(
                "." + classNames.Host + " > * > :nth-child(1) > :nth-child(1)"
            ))
                .map(x => x.getBoundingClientRect().width)
                .reduce((x, y) => Math.max(x, y))
        })
    }

    render() {
        let {
            children,
            className,
            onSelected = ({index}) => undefined,
            onUnselected = ({index}) => undefined,
            selectedIndexes = [],
            ...props
        } = this.props

        return (
            <List
                className={
                    [
                        className,
                        classNames.Host
                    ].join(" ")
                }
                {...props}
            >
                {
                    Array.from(React.Children.toArray(children).entries()).map(([i, x]) => 
                        React.cloneElement(
                            x,
                            {
                                labelWidth: this.state.labelWidth,
                                onClick   : e => {
                                    let {
                                        disabled,
                                        onClick = e => undefined
                                    } = x.props

                                    onClick(e)

                                    if (!disabled && e.currentTarget.children[0].contains(e.target)) {
                                        if (selectedIndexes.includes(i))
                                            onUnselected({
                                                index: i
                                            })
                                        else
                                            onSelected({
                                                index: i
                                            })
                                    }
                                },
                                selected  : selectedIndexes.includes(i),
                                ...x.props
                            }
                        )
                    )
                }
            </List>
        )
    }
}
