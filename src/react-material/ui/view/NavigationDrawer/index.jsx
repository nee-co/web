let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/NavigationDrawer/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            floating: false,
            onPress : e => {
                let {
                    onCancel
                } = this.props

                if (this.state.floating && !ReactDOM.findDOMNode(this).contains(e.target))
                    onCancel && onCancel()
            },
            resize : () => {
                let {
                    htmlFor
                } = this.props

                let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

                let actionBar = document.getElementById(htmlFor)

                let actionBarHeight = (
                    actionBar ? actionBar.getBoundingClientRect().height
                  :             56
                )

                let floating = window.innerWidth < 600

                this.setState({
                    width   : floating ? window.innerWidth - actionBarHeight
                            :            rect.width,
                    floating: floating
                })
            },
            width  : undefined
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

        window.addEventListener("resize", this.state.resize, false)
    }

    componentWillReceiveProps({
        visible
    }) {
        if (this.props.visible != visible) {
            if (visible) {
                window.addEventListener("mousedown", this.state.onPress, false)
                window.addEventListener("touchstart", this.state.onPress, false)
            } else {
                window.removeEventListener("mousedown", this.state.onPress, false)
                window.removeEventListener("touchstart", this.state.onPress, false)

                this.state.resize()
            }
        }
    }

    componentWillUnmount() {
        if (this.props.visible) {
            window.removeEventListener("mousedown", this.state.onPress, false)
            window.removeEventListener("touchstart", this.state.onPress, false)
        }

        window.removeEventListener("resize", this.state.resize, false)
    }

    render() {
        let {
            className,
            elevation = "16",
            htmlFor,
            onCancel,
            style,
            visible,
            ...props
        } = this.props

        let z = parseInt(elevation)

        let floating = this.state.floating

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        visible ? classNames.Visible
                      :           undefined,
                        floating ? classNames.Floating
                      :            undefined
                    ].join(" ")
                }
                component="nav"
                elevation={elevation}
                position="right"
                style={{
                    width     : (
                        this.state.width ? this.state.width + "px"
                      :                    undefined
                    ),
                    marginLeft: (
                        floating         ? 0
                      : visible          ? 0
                      : this.state.width ? -this.state.width + "px"
                      :                    undefined
                    ),
                    transform : (
                        visible  ? undefined
                      : floating ? "translateX(-100%) translateX(-" + z + "px)"
                      :            undefined
                    ),
                    ...style
                }}
                {...props}
            />
        )
    }
}
