var classNames = require("neeco/ui/view/RippleEffect/classNames")
var React      = require("react")

module.export = class extends React.Component {
    componentDidMount() {

    }
    
    render() {
        return (
            <div
                {...props}
                className={[className, classNames.RippleEffect].join(" ")}
                onClick={(e) => {
                    
                }}
            />
        )
    }
}
