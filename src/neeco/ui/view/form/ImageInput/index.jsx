let classNames = require("neeco/ui/view/form/ImageInput/classNames")
let React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            focused : false,
            imageURL: undefined,
            invalid : false
        })
    }

    render() {
        let {
            disabled,
            hintText,
            labelText,
            name,
            id = name,
            onBlur,
            onChange,
            onFocus,
            placeholder = hintText,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        classNames.ImageInput,
                        this.state.imageURL ? undefined
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
                    htmlFor={id || name}
                >
                    <span
                        className={classNames.LabelText}
                    >
                        {labelText}
                    </span>
                    <img
                        className={classNames.Preview}
                        alt={placeholder}
                        src={this.state.imageURL}
                    />
                </label>
                <input
                    {...props}
                    accept="image/*"
                    className={classNames.Input}
                    id={id || name}
                    name={name}
                    onChange={(e) => {
                        onChange && onChange(e)

                        let file = e.target.files[0]

                        if (this.state.imageURL)
                            URL.revokeObjectURL(this.state.imageURL)

                        this.setState({
                            imageURL: file && URL.createObjectURL(file)
                        })
                    }}
                    onBlur={(e) => {
                        onBlur && onBlur(e)

                        this.setState({
                            focused: false,
                            invalid: !e.target.validity.valid
                        })
                    }}
                    onFocus={(e) => {
                        onFocus && onFocus(e)

                        this.setState({
                            focused: true
                        })
                    }}
                    type="file"
                />
            </div>
        )
    }
}
