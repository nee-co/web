var Card       = require("neeco/ui/view/Card")
var classNames = require("neeco/ui/view/PopupCard/classNames")
var React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            isClicked: undefined,
            isVisible: this.props.isVisible,
            onClick  : (e) => {
                if (
                    this.state.isClicked === undefined
                 || this.state.isClicked
                )
                    this.setState({
                        isClicked: false
                    }) 
                else
                    this.setState({
                        isClicked: undefined,
                        isVisible: false
                    })
            }
        })
    }

    componentDidMount() {
        if (this.state.isVisible)
            window.addEventListener("click", this.state.onClick, false)
    }

    componentWillReceiveProps({
        isVisible
    }) {
        this.setState({
            isVisible: isVisible
        })
    }

    componentDidUpdate(props, state) {
        if (state.isVisible && !this.state.isVisible)
            window.removeEventListener("click", this.state.onClick)
        else if (!state.isVisible && this.state.isVisible)
            window.addEventListener("click", this.state.onClick, false)
    }

    componentWillUnMount() {
        if (this.state.isVisible)
            window.removeEventListener("click", this.state.onClick)
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
                    this.setState({
                        isClicked: true
                    })
                }}
            />
        )
    }
}