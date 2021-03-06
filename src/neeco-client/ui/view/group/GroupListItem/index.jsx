let toTextContent    = require("neeco-client/dom/toTextContent")
let React            = require("react")
let Card             = require("react-material/ui/view/Card")
let Image            = require("react-material/ui/view/Image")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")

let classNames = require("neeco-client/ui/view/group/GroupListItem/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            backgroundColor   : undefined,
            primaryTextColor  : undefined,
            secondaryTextColor: undefined
        })
    }

    render() {
        let {
            className,
            group,
            type,
            ...props
        } = this.props

        return (
            <Card
                className={
                    [
                        className,
                        classNames.Host,
                        type == "grid"   ? classNames.Grid
                      : type == "linear" ? classNames.Linear
                      :                    undefined
                    ].join(" ")
                }
                component={ListItem}
                to={"/groups/" + group.id}
                elevation={
                    type == "linear" ? 0
                  :                    undefined
                }
                {...props}
            >
                <ListItemIcon
                    alt={group.name}
                    crossOrigin="anonymous"
                    src={group.image}
                    onLoad={type == "grid" && (e => {
                        let vibrant = new Vibrant(e.target)

                        let swatch = vibrant.swatches()["Vibrant"]

                        if (swatch)
                            this.setState({
                                backgroundColor   : swatch.getHex(),
                                primaryTextColor  : swatch.getTitleTextColor(),
                                secondaryTextColor: swatch.getBodyTextColor()
                            })
                    })}
                />
                <ListItemTextArea
                    className={classNames.TextArea}
                    style={{
                        backgroundColor: this.state.backgroundColor
                    }}
                >
                    <p
                        style={{
                            color: this.state.primaryTextColor
                        }}
                    >
                        {group.name}
                    </p>
                    <p
                        style={{
                            color: this.state.secondaryTextColor
                        }}
                    >
                        {toTextContent(group.note)}
                    </p>
                </ListItemTextArea>
            </Card>
        )
    }
}
