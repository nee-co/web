let React        = require("react")
let ReactDOM     = require("react-dom")
let Shadow       = require("react-material/ui/effect/Shadow")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

let classNames = require("react-material/ui/view/ExpansionPanel/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: undefined,
            contentSize  : undefined
        })
    }

    componentDidMount() {
        let rect = ReactDOM.findDOMNode(this).children[1].getBoundingClientRect()

        this.setState({
            contentSize: [
                rect.width,
                rect.height
            ]
        })
    }

    render() {
        let {
            children,
            className,
            disabled,
            hintText,
            labelText,
            selected,
            value,
            ...props
        } = this.props

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        selected ? classNames.Selected
                      :            undefined
                    ].join(" ")
                }
                component="li"
                elevation="2"
                {...props}
            >
                <div>
                    <div>
                        {labelText}
                    </div>
                    <div>
                        {
                            selected ? hintText
                          :            value
                        }
                    </div>
                    <MaterialIcon>
                        {disabled || (
                            selected ? "arrow_drop_up"
                          :            "arrow_drop_down"
                        )}
                    </MaterialIcon>
                </div>
                <div
                    children={(
                        selected               ? children
                      : this.state.contentSize ? undefined
                      :                          children
                    )}
                    style={{
                        height: !this.state.contentSize ? undefined
                              : selected                ? this.state.contentSize[1] + "px"
                              :                           "0",
                    }}
                />
            </Shadow>
        )
    }
}
