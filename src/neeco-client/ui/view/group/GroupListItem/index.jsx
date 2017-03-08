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
            colorMap: undefined
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
                    src={group.image}
                />
                <ListItemTextArea
                    style={{
                        backgroundColor: (
                            this.state.palette ? this.state.palette.vibrantSwatch.color
                          :                      undefined
                        ),
                        color: (
                            this.state.palette ? this.state.palette.vibrantSwatch.titleTextColor
                          :                      undefined
                        )
                    }}
                >
                    <p>
                        {group.name}
                    </p>
                    <p>
                        {toTextContent(group.note)}
                    </p>
                </ListItemTextArea>
            </Card>
        )
    }
}
