var List       = require("neeco/ui/view/List")
var ListItem   = require("neeco/ui/view/ListItem")
var classNames = require("neeco/ui/view/navigation/TabBar/classNames")
var React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            left : -1,
            width: 0
        })
    }
    
    render() {
        var {
            children,
            onSelect,
            selectedIndex,
            ...props
        } = this.props

        return (
            <nav
                {...props}
                className={classNames.TabBar}
                ref={(element) => {
                    if (element) {
                        var parentRect = element.getBoundingClientRect()
                        var rect = element
                            .children[0]
                            .children[selectedIndex]
                            .getBoundingClientRect()

                        if ((rect.left - parentRect.left) != this.state.left) {
                            this.setState({
                                left : rect.left - parentRect.left,
                                width: rect.width
                            })
                        }
                    }
                }}
            >
                <List>
                    {Array.from(children.entries()).map(([i, v]) =>
                        <ListItem
                            children={v}
                            key={i}
                            onClick={(e) => {
                                onSelect(i)
                            }}
                        />
                    )}
                </List>
                <div
                    className={classNames.Indicator}
                    style={{
                        left : this.state.left  + "px",
                        width: this.state.width + "px"
                    }}
                />
            </nav>
        )
    }
}
