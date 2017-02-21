let React = require("react")
let List  = require("react-material/ui/view/List")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: undefined
        })
    }

    render() {
        let {
            children,
            ...props
        } = this.props

        return (
            <List
                {...props}
            >
                {
                    Array.from(React.Children.toArray(children).entries()).map(([i, x]) => 
                        React.cloneElement(
                            x,
                            {
                                onClick : e => {
                                    x.props.onClick && x.props.onClick(e)

                                    if (e.currentTarget.children[0].contains(e.target)) {
                                        if (this.state.selectedIndex == i)
                                            this.setState({
                                                selectedIndex: undefined
                                            })
                                        else
                                            this.setState({
                                                selectedIndex: i                                        
                                            })
                                    }
                                },
                                selected: i === this.state.selectedIndex
                            }
                        )
                    )
                }
            </List>
        )
    }
}