var Card       = require("neeco/ui/view/Card")
var classNames = require("neeco/ui/view/Popup/classNames")
var React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            isClicked: undefined,
            isVisible: this.props.isVisible,
            onClick  : (e) => {
                this.setState({
                    isVisible: false
                })
            }
        })
    }

    componentDidMount() {
        window.addEventListener("click", this.state.onClick, false)
    }

    componentWillReceiveProps({
        isVisible
    }) {
        this.setState({
            isVisible: isVisible
        })
    }

    componentWillUnMount() {
        window.removeEventListener("click", this.state.onClick, false)
    }

    render() {
        return (
            <Card
                children={this.props.children}
                className={
                    (
                        this.state.isVisible ? classNames.Visible
                      :                        classNames.Hidden
                    )
                  + " "
                  + this.props.className
                }
                onClick={(e) => {
                    e.stopPropagation()
                }}
            />
        )
    }
}