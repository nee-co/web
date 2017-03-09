let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/NavigationDrawer/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            onPress: e => {
                let {
                    elevation = "16",
                    onCancel
                } = this.props

                if (parseInt(elevation) > 0 && !ReactDOM.findDOMNode(this).contains(e.target))
                    onCancel && onCancel()
            },
            size   : undefined
        })
    }

    componentDidMount() {
        let {
            visible
        } = this.props

        if (visible) {
            window.addEventListener("mousedown", this.state.onPress, false)
            window.addEventListener("touchstart", this.state.onPress, false)
        }

        let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

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
                window.addEventListener("mousedown", this.state.onPress, false)
                window.addEventListener("touchstart", this.state.onPress, false)
            } else {
                let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

                this.setState({
                    size: [
                        rect.width,
                        rect.height
                    ]
                })

                window.removeEventListener("mousedown", this.state.onPress, false)
                window.removeEventListener("touchstart", this.state.onPress, false)
            }
        }
    }

    componentWillUnmount() {
        if (this.props.visible) {
            window.removeEventListener("mousedown", this.state.onPress, false)
            window.removeEventListener("touchstart", this.state.onPress, false)
        }
    }

    render() {
        let {
            className,
            elevation = "16",
            onCancel,
            style,
            visible,
            ...props
        } = this.props

        let z = parseInt(elevation)

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        visible ? classNames.Visible
                      :           undefined,
                        z > 0 ? classNames.Floating
                      :         undefined
                    ].join(" ")
                }
                component="nav"
                elevation={elevation}
                position="right"
                style={{
                    marginLeft: visible         ? 0
                              : z > 0           ? undefined
                              : this.state.size ? -(this.state.size[0] + z) + "px"
                              :                   undefined,
                    transform : visible ? undefined
                              : z > 0   ? "translateX(-100%) translateX(-" + z + "px)"
                              :           undefined,
                    ...style
                }}
                {...props}
            />
        )
    }
}
