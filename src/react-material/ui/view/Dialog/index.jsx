let React  = require("react")
let Root   = require("react-material/ui/control/Root")
let Shadow = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Dialog/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            onClick: (e) => {
                if (!this.e.contains(e.target))
                    this.props.onCancel && this.props.onCancel()
            }
        })
    }

    componentDidMount() {
        if (this.props.visible)
            setTimeout(() => window.addEventListener("click", this.state.onClick, false), 1)
    }

    componentWillReceiveProps({
        visible
    }) {
        if (this.props.visible != visible) {
            if (visible)
                setTimeout(() => window.addEventListener("click", this.state.onClick, false), 1)
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
            <Root
                className={
                    [
                        className,
                        classNames.Host,
                        visible ? undefined
                      :           classNames.Hidden
                    ].join(" ")
                }
                component={Shadow}
                elevation={24}
                onRender={(e) => {
                    if (e) {
                        let rect = e.getBoundingClientRect()

                        e.style.left = "calc(50vw - " + rect.width  + "px / 2)"
                        e.style.transform = (
                            visible ? "translateY(calc(50vh - " + rect.height + "px / 2))"
                          :           ""
                        )

                        this.e = e
                    }
                }}
                {...props}
            />
        )
    }
}
