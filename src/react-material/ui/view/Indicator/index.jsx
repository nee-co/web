let React        = require("react")
let ReactDOM     = require("react-dom")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

let classNames = require("react-material/ui/view/Indicator/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            angles   : [0, 0],
            offset   : 0,
            requestID: undefined
        })
    }

    componentDidMount() {
        let canvas = ReactDOM.findDOMNode(this)

        let context = canvas.getContext("2d")

        let rect = canvas.getBoundingClientRect()                

        canvas.width = rect.width
        canvas.height = rect.height

        let cycle = () => this.setState({
            angles   : [
                (
                    this.state.angles[1] < 320 ? 0
                  : this.state.angles[0] < 320 ? this.state.angles[0] + 10
                  :                              0
                ),
                (
                    this.state.angles[1] < 320 ? this.state.angles[1] + 10
                  : this.state.angles[0] < 320 ? 320
                  :                              0
                )
            ],
            offset   : this.state.angles[0] < 320 ? this.state.offset
                     : this.state.angles[1] < 320 ? this.state.offset
                     :                              (this.state.offset + 40 % 360),
            requestID: window.requestAnimationFrame(e => {
                let {
                    loaded,
                    loading,
                    onNext
                } = this.props

                let center = [
                    canvas.width / 2,
                    canvas.height / 2
                ]

                let radius = Math.min(center[0], center[1])

                context.clearRect(0, 0, canvas.width, canvas.height)

                let style = document.defaultView.getComputedStyle(canvas)

                let angles = [
                    (this.state.angles[0] - this.state.offset) * Math.PI / 180,
                    (this.state.angles[1] - this.state.offset) * Math.PI / 180
                ]

                context.fillStyle = style.color
                context.beginPath()
                context.arc(
                    center[0],
                    center[1],
                    radius,
                    angles[0],
                    angles[1],
                    false
                )
                context.arc(
                    center[0],
                    center[1],
                    radius - 4,
                    angles[1],
                    angles[0],
                    true
                )
                context.closePath()
                context.fill()

                let rect = canvas.getBoundingClientRect()

                if (!loaded && !loading && rect.top < window.innerHeight)
                    onNext && onNext()

                cycle()
            })
        })

        cycle()
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.state.requestID)
    }

    render() {
        let {
            className,
            loaded,
            loading,
            onNext,
            type = "circle",
            ...props
        } = this.props

        return (
            <canvas
                className={
                    [
                        className,
                        classNames.Host,
                        loading ? classNames.Loading
                      :           undefined,
                        type == "circle" ? classNames.Circle
                      : type == "line"   ? classNames.Line
                      :                    undefined
                    ].join(" ")
                }
                {...props}
            />
        )
    }
}
