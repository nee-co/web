var Shadow     = require("neeco/ui/effect/Shadow")
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
        var {
            children,
            className,
            ...props
        } = this.props

        return (
            <div
                className={
                    this.state.isVisible ? classNames.ModalWindow
                  :                        classNames.Hidden
                }
                onClick={(e) => {
                    if (!this.refs.self.contains(e.target))
                        this.setState({
                            isVisible: false
                        })
                }}
                ref="self"
            >
                <Shadow
                    children={children}
                    className={className}
                />
            </div>
        )
    }
}
