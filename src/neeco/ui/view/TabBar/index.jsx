let List       = require("neeco/ui/view/List")
let ListItem   = require("neeco/ui/view/ListItem")
let classNames = require("neeco/ui/view/TabBar/classNames")
let React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            left : -1,
            width: 0
        })
    }
    
    render() {
        let {
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
                        let parentRect = element.getBoundingClientRect()
                        let rect = element
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
                            className={classNames.Tab}
                            key={i}
                            onClick={onSelect && ((e) => {
                                onSelect(i)
                            })}
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
