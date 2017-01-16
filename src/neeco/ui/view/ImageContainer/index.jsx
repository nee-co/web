let classNames = require("neeco/ui/view/ImageContainer/classNames")
let React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            size: []
        })
    }

    render() {
        let {
            className,
            type = "contain",
            ...props
        } = this.props

        return (
            <span
                {...props}
                className={[className, classNames.Image].join(" ")}
                ref={(e) => {
                    if (e) {
                        let rect = e.getBoundingClientRect()
                        this.setState({
                            
                        })
                    }
                }}
            />
        )
    }
}
