let React            = require("react")
let Card             = require("react-material/ui/view/Card")
let Image            = require("react-material/ui/view/Image")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")

let classNames = require("neeco-client/ui/view/event/EventListItem/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            colorMap: undefined
        })
    }

    render() {
        let {
            className,
            event,
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
                to={"/events/" + event.id}
                elevation={
                    type == "linear" ? 0
                  :                    undefined
                }
                {...props}
            >
                <ListItemIcon
                    alt={event.title}
                    src={event.image}
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
                        {event.title}
                    </p>
                    <p>
                        {event.startDate}
                    </p>
                </ListItemTextArea>
            </Card>
        )
    }
}
