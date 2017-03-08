let React        = require("react")
let ReactDOM     = require("react-dom")
let List         = require("react-material/ui/view/List")
let ListItem     = require("react-material/ui/view/ListItem")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")
let Popup        = require("react-material/ui/view/Popup")

let classNames = require("react-material/ui/view/form/DropdownButton/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        let {
            value
        } = this.props

        this.setState({
            focus  : false,
            onClick: undefined,
            size   : undefined,
            value  : value
        })
    }

    componentDidMount(){
        let e = ReactDOM.findDOMNode(this)

        let rect1 = e.children[0].getBoundingClientRect()

        let rect2 = e.children[0].children[0].getBoundingClientRect()

        this.setState({
            size: [
                rect1.width,
                rect2.height
            ]
        })
    }

    componentWillReceiveProps({
        value
    }) {
        if (value != this.state.value)
            this.setState({
                value: value
            })
    }

    componentWillUnmount() {
        if (this.state.onClick)
            window.removeEventListener("click", this.state.onClick, false)
    }

    render() {
        let {
            children,
            className,
            editable,
            disabled,
            name,
            onChange = x => undefined,
            style,
            value,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host,
                        disabled ? classNames.Disabled
                      :            undefined,
                        editable ? classNames.Editable
                      :            undefined,
                        this.state.focus ? classNames.Focus
                      :                    undefined
                    ].join(" ")
                }
                style={{
                    minWidth : this.state.size ? this.state.size[0]
                             :                   undefined,
                    minHeight: this.state.size ? this.state.size[1]
                             :                   undefined,
                    ...style
                }}
                {...props}
            >
                <Popup
                    elevation={
                        this.state.focus ? undefined
                      :                    0
                    }
                    onCancel={() => {
                        if (editable)
                            return

                        this.setState({
                            focus: false
                        })
                    }}
                    visible={this.state.focus}
                >
                    <div
                        onClick={e => {
                            if (disabled)
                                return

                            if (editable) {
                                let element = e.currentTarget.children[0]

                                element == e.target ? undefined
                              : this.state.focus    ? element.blur()
                              : this.state.onClick  ? undefined
                              :                       element.focus()

                                return
                            }

                            this.setState({
                                focus: !this.state.focus
                            })
                        }}
                    >
                        <input
                            disabled={disabled}
                            readOnly={!editable}
                            name={name}
                            onBlur={!editable ? undefined : e => {
                                let onClick = e => {
                                    window.removeEventListener("click", onClick, false)

                                    this.setState({
                                        onClick: undefined
                                    })
                                }

                                window.addEventListener("click", onClick, false)

                                this.setState({
                                    focus  : false,
                                    onClick: onClick
                                })

                                onChange(this.state.value)
                            }}
                            onChange={!editable ? undefined : e => {
                                this.setState({
                                    value: e.target.value
                                })
                            }}
                            onFocus={!editable ? undefined : e => {
                                this.setState({
                                    focus: true
                                })
                            }}
                            value={this.state.value}
                        />
                        <MaterialIcon
                            className={classNames.Icon}
                        >
                            {
                                disabled ? undefined
                              :            "arrow_drop_down"
                            }
                        </MaterialIcon>
                    </div>
                    <List>
                        {React.Children.toArray(children)
                            .filter(x => value !=  x.props.children)
                            .map(x => React.cloneElement(
                                x,
                                {
                                    onClick: e => {
                                        let {
                                            children,
                                            onClick = e => undefined,
                                        } = x.props

                                        onClick(e)

                                        this.setState({
                                            focus: false
                                        })

                                        onChange(value)
                                    }
                                }
                            ))
                        }
                    </List>
                </Popup>
            </div>
        )
    }
}
