let React = require("react")
let Image = require("react-material/ui/view/Image")

let classNames = require("react-material/ui/view/form/ImageInput/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            focused : false,
            imageUrl: undefined,
            invalid : false
        })
    }

    render() {
        let {
            className,
            defaultImageUrl,
            disabled,
            height = "128",
            hintText,
            labelText,
            name,
            id = name,
            onBlur = e => undefined,
            onChange = e => undefined,
            onFocus = e => undefined,
            onLoad,
            placeholder = hintText,
            width = "128",
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
                    <Image
                        alt={placeholder}
                        className={classNames.Image}
                        height={height}
                        onLoad={onLoad}
                        src={this.state.imageUrl || defaultImageUrl}
                        width={width}
                    />
                </label>
                <input
                    accept="image/*"
                    className={classNames.Input}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onChange={e => {
                        onChange(e)

                        if (this.state.imageUrl)
                            URL.revokeObjectURL(this.state.imageUrl)

                        let file = e.target.files[0]

                        this.setState({
                            imageUrl: file && URL.createObjectURL(file)
                        })
                    }}
                    onBlur={e => {
                        onBlur(e)

                        this.setState({
                            focused: false,
                            invalid: !e.target.validity.valid
                        })
                    }}
                    onFocus={e => {
                        onFocus(e)

                        this.setState({
                            focused: true
                        })
                    }}
                    type="file"
                    {...props}
                />
            </div>
        )
    }
}
