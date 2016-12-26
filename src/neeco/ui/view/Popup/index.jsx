var Shadow     = require("neeco/ui/effect/Shadow")
var classNames = require("neeco/ui/view/Popup/classNames")
var React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            onClick: (e) => {
                if (!this.refs.self.contains(e.target))
                    this.props.onCancel()
            }
        })
    }

    componentDidMount() {
        if (this.props.isVisible)
            window.addEventListener("click", this.state.onClick, false)
    }

    componentWillReceiveProps({isVisible}) {
        if (this.props.isVisible != isVisible) {
            if (isVisible)
                window.addEventListener("click", this.state.onClick, false)
            else
                window.removeEventListener("click", this.state.onClick, false)
        }
    }

    componentWillUnmount() {
        if (this.props.isVisible)
            window.removeEventListener("click", this.state.onClick, false)
    }

    render() {
        var {
            children,
            className,
            isVisible,
            onCancel,
            ...props
        } = this.props

        return (
            <div
                ref="self"
            >
                <Shadow
                    {...props}
                    children={children}
                    className={[
                        className,
                        (
                            isVisible ? classNames.Visible
                          :             classNames.Hidden
                        )
                    ].join(" ")}
                />
            </div>
        )
    }
}