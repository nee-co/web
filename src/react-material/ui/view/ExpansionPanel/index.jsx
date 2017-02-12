let React = require("react")

let classNames = require("react-material/ui/view/Divider/classNames")

module.exports = class extends React.Component {
    render() {
        let {
            className,
            labelText,
            selected,
            ...props
        } = this.props

        return (
            <li
                {...props}
                className={
                    [
                        className,
                        classNames.Host,
                        selected ? classNames.Selected
                      :            undefined
                    ].join(" ")
                }
            >
                <div>
                    <div className={classNames.Label}>
                        {labelText}
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                </div>
            </li>
        )
    }
}
