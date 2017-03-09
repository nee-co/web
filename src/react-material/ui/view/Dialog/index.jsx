let React    = require("react")
let ReactDOM = require("react-dom")
let Root     = require("react-material/ui/control/Root")
let Shadow   = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Dialog/classNames")

module.exports = props =>
    <Root>
        <Dialog
            {...props}
        />
    </Root>

let Dialog = class extends React.Component {
    componentWillMount() {
        this.setState({
            onClick: e => {
                let {
                    onCancel = () => undefined
                } = this.props

                if (!ReactDOM.findDOMNode(this).contains(e.target))
                    onCancel()
            },
            size   : undefined
        })
    }

    componentDidMount() {
        let {
            visible
        } = this.props

        if (visible)
            setTimeout(
                () => window.addEventListener("click", this.state.onClick, false),
                1
            )

        let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

        this.setState({
            size: [
                rect.width,
                rect.height
            ]
        })
    }

    componentWillReceiveProps({
        visible
    }) {
        if (this.props.visible != visible) {
            if (visible)
                setTimeout(
                    () => window.addEventListener("click", this.state.onClick, false),
                    1
                )
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
            children,
            className,
            onCancel,
            style,
            visible,
            ...props
        } = this.props

        return (
            <Shadow
                children={(
                    visible         ? children
                  : this.state.size ? undefined
                  :                   children
                )}
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.visible ? classNames.Visible
                      : this.state.size    ? classNames.Hidden
                      :                      undefined
                    ].join(" ")
                }
                elevation="24"
                style={{
                    width    : this.state.size ? this.state.size[0] + "px"
                             :                   undefined,
                    height   : this.state.size ? this.state.size[1] + "px"
                             :                   undefined,
                    transform: (
                        !visible         ? undefined
                      : !this.state.size ? undefined
                      :                    [
                            "translateX(50vw)",
                            "translateX(" + -this.state.size[0] / 2 + "px)",
                            "translateY(50vh)",
                            "translateY(" + -this.state.size[1] / 2 + "px)"
                        ].join(" ")
                    ),
                    ...style
                }}
                {...props}
            />
        )
    }
}
