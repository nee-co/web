var Card       = require("neeco/ui/view/Card")
var classNames = require("neeco/ui/view/Dialog/classNames")
var React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            isVisible: this.props.isVisible
        })
    }

    componentWillReceiveProps({
        isVisible
    }) {
        this.setState({
            isVisible: isVisible
        })
    }

    render() {
        return (
            <div
                className={
                    this.state.isVisible ? classNames.ModalWindow
                  :                        classNames.Hidden
                }
                onClick={(e) => {
                    this.setState({
                        isVisible: false
                    })
                }}
            >
                <Card
                    children={this.props.children}
                    className={this.props.className}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        )
    }
}
