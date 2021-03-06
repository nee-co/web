let React  = require("react")
let Root   = require("react-material/ui/control/Root")
let Shadow = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/Snackbar/classNames")

module.exports = (props) =>
    <Root>
        <Snackbar
            {...props}
        />
    </Root>

let Snackbar = class extends React.Component {
    componentWillMount() {
        this.setState({
            timeoutID: undefined,
            visible  : true
        })
    }

    componentWillUnmount() {
        if (this.state.timeoutID)
            clearTimeout(this.state.timeoutID)
    }

    render() {
        let {
            className,
            duration,
            onAnimationEnd,
            onHidden,
            ...props
        } = this.props

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.visible ? classNames.Visible
                      :                      classNames.Hidden
                    ].join(" ")
                }
                elevation="6"
                onAnimationEnd={e => {
                    onAnimationEnd && onAnimationEnd(e)

                    if (this.state.visible)
                        this.setState({
                            timeoutID: setTimeout(
                                () => {
                                    this.setState({
                                        timeoutID: undefined,
                                        visible  : false
                                    })
                                },
                                duration
                            )
                        })
                    else
                        onHidden && onHidden()
                }}
                {...props}
            />
        )
    }
}