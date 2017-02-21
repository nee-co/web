let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/NavigationDrawer/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        let {
            elevation,
            onCancel
        } = this.props

        this.setState({
            onClick: e => {
                if (elevation > 0 && !ReactDOM.findDOMNode(this).contains(e.target))
                    onCancel && onCancel()
            },
            size   : undefined
        })
    }

    componentDidMount() {
        let {
            visible
        } = this.props

        if (visible)
            setTimeout(
                () => window.addEventListener("click", this.state.onClick, false),
                1
            )

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
            if (visible)
                setTimeout(
                    () => window.addEventListener("click", this.state.onClick, false),
                    1
                )
            else
                window.removeEventListener("click", this.state.onClick, false)
        }
    }

    componentWillUnmount() {
        if (this.props.visible)
            window.removeEventListener("click", this.state.onClick, false)
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

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        visible ? classNames.Visible
                      :           classNames.Hidden,
                        parseInt(elevation) > 0 ? classNames.Floating
                      :                           undefined
                    ].join(" ")
                }
                component="nav"
                elevation={elevation}
                position="right"
                style={{
                    marginLeft: visible         ? 0
                              : this.state.size ? "-" + (this.state.size[0] + 16) + "px"
                              :                   undefined,
                    ...style
                }}
                {...props}
            />
        )
    }
}
