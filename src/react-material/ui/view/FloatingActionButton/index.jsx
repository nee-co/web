let React    = require("react")
let ReactDOM = require("react-dom")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/FloatingActionButton/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            rect: undefined
        })
    }

    componentDidMount() {
        let rect = ReactDOM.findDOMNode(this).parentElement.getBoundingClientRect()

        this.setState({
            rect: rect
        })
    }

    componentWillReceiveProps({
        fullscreen
    }) {
        if (fullscreen != this.props.fullscreen) {
            let rect = ReactDOM.findDOMNode(this).parentElement.getBoundingClientRect()

            this.setState({
                rect: rect
            })
        }
    }

    render() {
        let {
            className,
            fullscreen,
            style,
            ...props
        } = this.props

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        fullscreen ? classNames.FullScreen
                      :              undefined
                    ].join(" ")
                }
                elevation="12"
                style={
                    fullscreen && this.state.rect ? {
                        top   : this.state.rect.top    + "px",
                        left  : this.state.rect.left   + "px",
                        width : this.state.rect.width  + "px",
                        height: this.state.rect.height + "px",
                        ...style
                    }
                  :                                  style
                }
                {...props}
            />
        )
    }
}
