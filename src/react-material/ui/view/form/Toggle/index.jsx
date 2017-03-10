let React  = require("react")
let Toggle = require("react-material/ui/view/Toggle")

let classNames = require("react-material/ui/view/form/Toggle/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        let {
            defaultChecked
        } = this.props

        this.setState({
            checked: defaultChecked
        })
    }

    render() {
        let {
            className,
            name,
            id = name,
            defaultChecked,
            disabled,
            labelText,
            onBlur = e => undefined,
            onFocus = e => undefined,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.imageUrl ? undefined
                      :                       classNames.Empty,
                        disabled ? classNames.Disabled
                      :            undefined,
                        this.state.focused ? classNames.Focused
                      :                      undefined,
                        this.state.invalid ? classNames.Invalid
                      :                      undefined
                    ].join(" ")
                }
            >
                <label
                    className={classNames.Label}
                    htmlFor={id}
                >
                    <span
                        className={classNames.LabelText}
                    >
                        {labelText}
                    </span><br />
                    <Toggle
                        checked={this.state.checked}
                        disabled={disabled}
                    />
                </label>
                <input
                    checked={this.state.checked}
                    className={classNames.Input}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onBlur={e => {
                        onBlur(e)

                        this.setState({
                            focused: false,
                            invalid: !e.target.validity.valid
                        })
                    }}
                    onChange={e => {
                        this.setState({
                            checked: e.target.checked
                        })
                    }}
                    onFocus={e => {
                        onFocus(e)

                        this.setState({
                            focused: true
                        })
                    }}
                    type="checkbox"
                    {...props}
                />
            </div>
        )
    }

}
