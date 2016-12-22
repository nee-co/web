var Card       = require("neeco/ui/view/Card")
var classNames = require("neeco/ui/view/ModalWindow/classNames")
var React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            isClicked: false,
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
                    if (this.state.isClicked)
                        this.setState({
                            isClicked: false
                        }) 
                    else
                        this.setState({
                            isVisible: false
                        })
                    }
                }
            >
                <Card
                    children={this.props.children}
                    className={this.props.className}
                    onClick={(e) => {
                        this.setState({
                            isClicked: true
                        })
                    }}
                />
            </div>
        )
    }
}
