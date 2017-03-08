let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Popup/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            onPress: e => {
                let {
                    visible,
                    onCancel
                } = this.props

                if (this.props.visible && !ReactDOM.findDOMNode(this).contains(e.target))
                    onCancel && onCancel()
            },
            size: undefined
        })
    }

    componentDidMount() {
        window.addEventListener("mousedown", this.state.onPress, false)
        window.addEventListener("ontouchstart", this.state.onPress, false)

        let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

        this.setState({
            size: [
                rect.width,
                rect.height
            ]
        })
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.state.onPress, false)
        window.removeEventListener("ontouchstart", this.state.onPress, false)
    }

    render() {
        let {
            className,
            elevation = "8",
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
                        parseInt(elevation) > 0 ? classNames.Floating
                      :                           undefined,
                        visible         ? classNames.Visible
                      : this.state.size ? classNames.Hidden
                      :                   undefined
                    ].join(" ")
                }
                elevation={elevation}
                style={{
                    width : !this.state.size ? undefined
                          : visible          ? this.state.size[0] + "px"
                          :                    undefined,
                    height: !this.state.size ? undefined
                          : visible          ? this.state.size[1] + "px"
                          :                    undefined,
                    ...style
                }}
                {...props}
            />
        )
    }
}
