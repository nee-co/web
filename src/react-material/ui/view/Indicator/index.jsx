let React        = require("react")
let ReactDOM     = require("react-dom")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

let classNames = require("react-material/ui/view/Indicator/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            requestID: undefined
        })
    }

    componentDidMount() {
        let cycle = () => this.setState({
            requestID: window.requestAnimationFrame(e => {
                let {
                    loaded,
                    loading,
                    onLoad
                } = this.props

                let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

                if (!loaded && !loading && rect.top < window.innerHeight)
                    onLoad && onLoad()

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
            onLoad,
            type = "circle",
            ...props
        } = this.props

        return (
            <MaterialIcon
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
            >
                {loaded || "cached"}
            </MaterialIcon>
        )
    }
}
