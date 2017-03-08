let React        = require("react")
let ReactDOM     = require("react-dom")
let Ripple       = require("react-material/ui/effect/Ripple")
let Shadow       = require("react-material/ui/effect/Shadow")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

let classNames = require("react-material/ui/view/ExpansionPanel/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            contentSize: undefined
        })
    }

    componentDidMount() {
        let e = ReactDOM.findDOMNode(this)

        let contentRect = e.children[1].getBoundingClientRect()

        this.setState({
            contentSize: [
                contentRect.width,
                contentRect.height
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
            labelWidth,
            location,
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
                        disabled ? classNames.Disabled
                      :            undefined,
                        selected ? classNames.Selected
                      :            undefined
                    ].join(" ")
                }
                component="li"
                disabled={disabled}
                elevation="2"
                {...props}
            >
                <Ripple
                    disabled={disabled}
                >
                    <div
                        style={{
                            minWidth: labelWidth ? labelWidth + "px"
                                    :              undefined
                        }}
                    >
                        {labelText}
                    </div>
                    <div>
                        {
                            selected ? hintText
                          :            value
                        }
                    </div>
                    <MaterialIcon
                        className={classNames.Icon}
                    >
                        {
                            disabled ? undefined
                          :            "keyboard_arrow_down"
                        }
                    </MaterialIcon>
                </Ripple>
                <div
                    children={(
                        selected               ? children
                      : this.state.contentSize ? undefined
                      :                          children
                    )}
                    style={{
                        height: !this.state.contentSize ? undefined
                              : selected                ? this.state.contentSize[1] + "px"
                              :                           "0"
                    }}
                />
            </Shadow>
        )
    }
}
