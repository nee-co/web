let getEvents     = require("neeco-client/api/event/getEvents")
let apply         = require("neeco-client/apply")
let config        = require("neeco-client/config")
let EventListItem = require("neeco-client/ui/view/event/EventListItem")
let React         = require("react")
let List          = require("react-material/ui/view/List")
let {Link}        = require("react-router")

let classNames = require("neeco-client/ui/view/event/EntriedEventListPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events: undefined
        })
    }

    componentDidMount() {
        let {
            onError,
            store
        } = this.props

        ;(async () => {
            try {
                this.setState({
                    events: await getEvents({
                        apiHost: config["neeco_api_host"],
                        token  : apply(store, "token"),
                        query  : "",
                        entried: true,
                        limit  : 10,
                        offset : 0
                    })
                })
            } catch (e) {
                onError(e)
            }
        })()
    }

    render() {
        let {
            className,
            store,
            ...props
        } = this.props

        return (
            <section
                {...props}
                className={[className, classNames.Host].join(" ")}
            >
                <List>
                    {this.state.events && this.state.events.map(x =>
                        <EventListItem
                            key={x.id}
                            event={x}
                        />
                    )}
                </List>
            </section>
        )
    }
}
