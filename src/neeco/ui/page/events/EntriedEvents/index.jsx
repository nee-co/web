let searchEvents  = require("neeco/api/event/searchEvents")
let EventListItem = require("neeco/ui/view/event/EventListItem")
let React         = require("react")
let List          = require("react-material/ui/view/List")
let {Link}        = require("react-router")

let classNames = require("neeco/ui/page/events/EntriedEvents/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            eventsPage: undefined
        })
    }

    componentDidMount() {
        let {
            token
        } = this.props

        ;(async () => {
            let eventsPage = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                query  : "",
                entried: true,
                limit  : 10,
                offset : 0
            })

            this.setState({
                eventsPage: eventsPage
            })
        })()
    }

    render() {
        let {
            className,
            token,
            ...props
        } = this.props

        return (
            <section
                {...props}
                className={[className, classNames.EntriedEvents].join(" ")}
            >
                <List>
                    {
                        this.state.eventsPage
                     && this.state.eventsPage.data.map((x) => <EventListItem key={x.id} event={x} />)
                    }
                </List>
            </section>
        )
    }
}
