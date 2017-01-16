let classNames = require("neeco/ui/view/ScrollArea/classNames")
let React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            childrenWrapperPosition: [0, 0],
            childrenWrapperSize    : [0, 0],
            scrollAreaSize         : [0, 0],
            dragging               : false,
            start                  : [0, 0]
        })
    }

    componentDidMount() {
        let onResize = (e) => {
            this.setState({
                childrenWrapperPosition: this.normalize(this.state.childrenWrapperPosition),
                childrenWrapperSize: [
                    this.refs.childrenWrapper.clientWidth,
                    this.refs.childrenWrapper.clientHeight
                ],
                scrollAreaSize: [
                    this.refs.scrollArea.clientWidth,
                    this.refs.scrollArea.clientHeight
                ]
            })
        }

        window.addEventListener("resize", onResize)
        this.onResize = onResize

        onResize()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize)
        this.onResize = null
    }

    render() {
        return (
            <div
                {...this.props}
                className={this.props.className + " "+ classNames.ScrollArea}
                ref="scrollArea"
                onWheel={(e) => {
                    e.preventDefault()

                    let shifted = e.shiftKey

                    let [x, y] = this.state.childrenWrapperPosition

                    if (shifted)
                        this.setState({
                            childrenWrapperPosition: this.normalize([
                                x - e.deltaX,
                                y
                            ])
                        })
                    else
                        this.setState({
                            childrenWrapperPosition: this.normalize([
                                x,
                                y - e.deltaY
                            ])
                        })
                }}
                onTouchStart={(e) => {
                    e.preventDefault()

                    let touch = e.targetTouches[0]

                    this.setState({
                        dragging: true,
                        start: [touch.screenX, touch.screenY]
                    })
                }}
                onTouchMove={(e) => {
                    if (this.state.dragging) {
                        e.preventDefault()

                        let touch = e.targetTouches[0]

                        let [x, y] = this.state.childrenWrapperPosition

                        this.setState({
                            childrenWrapperPosition: this.normalize([
                                x - (this.state.start[0] - touch.screenX),
                                y - (this.state.start[1] - touch.screenY)
                            ]),
                            start: [touch.screenX, touch.screenY]
                        })
                    }
                }}
                onTouchEnd={(e) => {
                    this.setState({dragging: false})
                }}
            >
                <div
                    className={classNames.ChildrenWrapper}
                    ref="childrenWrapper"
                    style={{
                        marginTop : this.state.childrenWrapperPosition[1] + "px",
                        marginLeft: this.state.childrenWrapperPosition[0] + "px"
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }

    normalize(p) {
        let newPosition = []

        for (let i = 0; i < p.length; i += 1) {
            let end = this.state.scrollAreaSize[i] - this.state.childrenWrapperSize[i]

            newPosition[i] = p[i] > 0   ? 0
                           : p[i] > end ? p[i]
                           :              end
        }

        return newPosition
    }
}
