let React        = require("react")
let ReactDOM     = require("react-dom")
let Shadow       = require("react-material/ui/effect/Shadow")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

let classNames = require("react-material/ui/view/Search/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            focus: false
        })
    }

    render() {
        let {
            className,
            expandable,
            name,
            hintText,
            onChange,
            onMouseDown = e => undefined,
            onTouchStart = e => undefined,
            placeholder = hintText,
            readOnly,
            value,
            ...props
        } = this.props

        let onPress = e => {
            e.preventDefault()

            e.currentTarget.children[1].focus()
        }

        let onCancel = e => {
            if (this.state.focus) {
                e.stopPropagation()
                e.currentTarget.children[1].blur()
            }
        }

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        expandable ? classNames.Expandable
                      :              undefined,
                        this.state.focus ? classNames.Focus
                      :                    undefined
                    ].join(" ")
                }
                elevation={
                    this.state.focus ? 3
                  :                    2
                }
                onMouseDown={e => {
                    onMouseDown(e)
                    onPress(e)
                }}
                onTouchStart={e => {
                    onTouchStart(e)
                    onPress(e)
                }}
                {...props}
            >
                <MaterialIcon
                    onMouseDown={onCancel}
                    onTouchStart={onCancel}
                >
                    <span>search</span>
                    <span>arrow_back</span>
                </MaterialIcon>
                <input
                    name={name}
                    onBlur={e => {
                        this.setState({
                            focus: false
                        })
                    }}
                    onChange={onChange}
                    onFocus={e => {
                        this.setState({
                            focus: true
                        })
                    }}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    value={value}
                />
            </Shadow>
        )
    }
}
