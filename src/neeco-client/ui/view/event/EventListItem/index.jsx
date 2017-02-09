let toPalette        = require("neeco-client/graphics/toPalette")
let React            = require("react")
let Image            = require("react-material/ui/view/Image")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")

let classNames = require("neeco-client/ui/view/event/EventListItem/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            palette: undefined
        })
    }

    render() {
        let {
            className,
            event,
            ...props
        } = this.props

        return (
            <ListItem
                {...props}
                className={[className, classNames.Host].join(" ")}
                to={"/events/" + event.id}
            >
                <ListItemIcon
                    alt={event.title}
                    src={event.image}
                    onLoad={e => {
                        let img = e.target

                        let canvas = document.createElement("canvas")
                        canvas.width = img.width
                        canvas.height = img.height

                        let context = canvas.getContext("2d")
                        context.drawImage(img, 0, 0)

                        this.setState({
                            /*palette: toPalette({
                                imageData: context.getImageData(0, 0, img.width, img.height)
                            })*/
                        })
                    }}
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
                    <p
                        className={classNames.EventTitle}
                    >
                        {event.title}
                    </p>
                    <p
                        className={classNames.EventDate}
                    >
                        {event.startDate}
                    </p>
                </ListItemTextArea>
            </ListItem>
        )
    }
}
