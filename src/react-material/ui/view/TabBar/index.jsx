let React      = require("react")
let List       = require("react-material/ui/view/List")
let classNames = require("react-material/ui/view/TabBar/classNames")
let match      = require("react-material/util/match")

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
            location,
            selectedIndex = Math.max(
                0,
                React.Children.toArray(children).findIndex((x) => match({
                    location: location,
                    locationDescriptor: x.props.to
                }))
            ),
            ...props
        } = this.props

        return (
            <div
                {...props}
                className={classNames.TabBar}
                ref={(element) => {
                    if (element && selectedIndex >= 0) {
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
                <List
                    children={children}
                />
                <div
                    className={classNames.Indicator}
                    style={{
                        left : this.state.left  + "px",
                        width: this.state.width + "px"
                    }}
                />
            </div>
        )
    }
}
