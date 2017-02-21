let React        = require("react")
let ReactDOM     = require("react-dom")
let List         = require("react-material/ui/view/List")
let ListItem     = require("react-material/ui/view/ListItem")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")
let Popup        = require("react-material/ui/view/Popup")

let classNames = require("react-material/ui/view/DropDownButton/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        let {
            children,
        } = this.props

        this.setState({
            opened       : false,
            selectedIndex: React.Children.toArray(children).findIndex(x => x.props.selected),
            size         : undefined
        })
    }

    componentDidMount(){
        let e = ReactDOM.findDOMNode(this)

        let rect = e.children[0].children[0].getBoundingClientRect()

        this.setState({
            size: [
                rect.width,
                rect.height
            ]
        })
    }

    componentWillReceiveProps({
        children
    }) {
        this.setState({
            selectedIndex: React.Children.toArray(children).findIndex(x => x.props.selected)
        })
    }

    render() {
        let {
            children,
            className,
            onChange,
            style,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.opened ? classNames.Opened
                      :                     classNames.Closed
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
                        this.state.opened ? undefined
                      :                     0
                    }
                    onCancel={() => this.setState({
                        opened: false
                    })}
                    style={{
                        minWidth : this.state.size ? this.state.size[0]
                                 :                   undefined,
                        minHeight: this.state.size ? this.state.size[1]
                                 :                   undefined,
                    }}
                    visible={this.state.opened}
                >
                    <div
                        onClick={e => this.setState({
                            opened: !this.state.opened
                        })}
                    >
                        <div>
                            {React.Children.toArray(children)[this.state.selectedIndex].props.children}
                        </div>
                        <MaterialIcon>
                            {
                                this.state.opened ? "arrow_drop_up"
                              :                     "arrow_drop_down"
                            }
                        </MaterialIcon>
                    </div>
                    <List>
                        {React.Children.toArray(children)
                            .filter(x => !x.props.selected)
                            .map(x => React.cloneElement(
                                x,
                                {
                                    onClick: e => {
                                        x.props.onClick && x.props.onClick()

                                        this.setState({
                                            opened: false
                                        })

                                        if (!x.props.selected)
                                            onChange && onChange(x)
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
