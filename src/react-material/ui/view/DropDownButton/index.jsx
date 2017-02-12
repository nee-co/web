let React = require("react")
let Menu  = require("react-material/ui/view/Menu")

let classNames = require("react-material/ui/view/DropDownButton/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        let {
            children,
        } = this.props

        this.setState({
            opened       : false,
            selectedIndex: React.Children.toArray(children).findIndex(x => x.props.selected)
        })
    }

    componentWillReceiveProps() {
        let {
            children,
        } = this.props

        this.setState({
            selectedIndex: React.Children.toArray(children).findIndex(x => x.props.selected)
        })
    }

    render() {
        let {
            children,
            className,
            onChange,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.opened ? classNames.Opend
                      :                     classNames.Closed
                    ].join(" ")
                }
            >
                {
                    React.Children.toArray(children)[this.state.selectedIndex].props.children
                }
                <Menu
                    {...props}
                >
                    {React.Children.toArray(children).map(x =>
                        React.cloneElement(
                            x,
                            {
                                onClick: (e) => {
                                    onChange && onChange()
                                }
                            }
                        )
                    )}
                </Menu>
            </div>
        )
    }
}
