let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Popup/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            onClick: (e) => {
                if (!ReactDOM.findDOMNode(this).contains(e.target))
                    this.props.onCancel && this.props.onCancel()
            },
            size: undefined
        })
    }

    componentDidMount() {
        if (this.props.visible) {
            setTimeout(() => window.addEventListener("click", this.state.onClick, false), 1)
        }

        let e = ReactDOM.findDOMNode(this).children[0]

        let rect = e.getBoundingClientRect()

        this.setState({
            size: [
                rect.width,
                rect.height
            ]
        })
    }

    componentWillReceiveProps({
        visible
    }) {
        if (this.props.visible != visible) {
            if (visible) {
                setTimeout(() => window.addEventListener("click", this.state.onClick, false), 1)
            } else {
                window.removeEventListener("click", this.state.onClick, false)
            }
        }
    }

    componentWillUnmount() {
        if (this.props.visible)
            window.removeEventListener("click", this.state.onClick, false)
    }

    render() {
        let {
            children,
            className,
            component = "div",
            elevation,
            visible,
            onCancel,
            ...props
        } = this.props

        return (
            <Shadow
                {...props}
                className={
                    [
                        className,
                        classNames.Host,
                        visible ? undefined
                      :           classNames.Hidden
                    ].join(" ")
                }
                component={component}
                elevation={8}
                style={{
                    width : visible && this.state.size ? this.state.size[0] + "px"
                          :                              0,
                    height: visible && this.state.size ? this.state.size[1] + "px"
                          :                              0,
                }}
            >
                <div
                    children={children}
                />
            </Shadow>
        )
    }
}
