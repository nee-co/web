let Shadow     = require("neeco/ui/effect/Shadow")
let classNames = require("neeco/ui/view/Popup/classNames")
let React      = require("react")

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
        if (this.props.visible)
            setTimeout(() => window.addEventListener("click", this.state.onClick, false), 0)
    }

    componentWillReceiveProps({
        visible
    }) {
        if (this.props.visible != visible) {
            if (visible)
                setTimeout(() => window.addEventListener("click", this.state.onClick, false), 0)
            else
                window.removeEventListener("click", this.state.onClick, false)
        }
    }

    componentWillUnmount() {
        if (this.props.visible)
            window.removeEventListener("click", this.state.onClick, false)
    }

    render() {
        let {
            className,
            visible,
            onCancel,
            ...props
        } = this.props

        return (
            <div
                ref="self"
            >
                <Shadow
                    {...props}
                    className={
                        [
                            className,
                            classNames.Popup,
                            visible ? undefined
                          :           classNames.Hidden
                        ].join(" ")
                    }
                />
            </div>
        )
    }
}
