let getEvents       = require("neeco-client/api/event/getEvents")
let apply           = require("neeco-client/apply")
let config          = require("neeco-client/config")
let FontAwesomeIcon = require("neeco-client/ui/view/FontAwesomeIcon")
let EventCardList   = require("neeco-client/ui/view/event/EventCardList")
let React           = require("react")
let Shadow          = require("react-material/ui/effect/Shadow")
let Button          = require("react-material/ui/view/Button")
let TextField       = require("react-material/ui/view/form/TextField")
let {Link}          = require("react-router")

let classNames = require("neeco-client/ui/view/event/EventListPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events: undefined
        })
    }

    componentDidMount() {
        let {
            location,
            onError,
            store
        } = this.props

        ;(async () => {
            try {
                this.setState({
                    events: await getEvents({
                        apiHost: config["neeco_api_host"],
                        token  : apply(store, "token"),
                        query  : location.query["q"] || "",
                        page   : 1,
                        perPage: 10
                    })
                })
            } catch (e) {
                onError(e)
            }
        })()
    }

    componentWillReceiveProps({
        location,
        onError,
        store
    }) {
        if (location.query["q"] != this.props.location.query["q"]) {
            ;(async () => {
                try {
                    this.setState({
                        events: await getEvents({
                            apiHost: config["neeco_api_host"],
                            token  : apply(store, "token"),
                            query  : location.query["q"] || "",
                            page   : 1,
                            perPage: 10
                        })
                    })
                } catch (e) {
                    onError(e)
                }
            })()
        }
    }

    render() {
        let {
            className,
            location,
            router,
            store,
            ...props
        } = this.props

        return (
            <section
                {...props}
                className={[className, classNames.Host].join(" ")}
            >
                <form
                    className={classNames.SearchForm}
                    onSubmit={async e => {
                        e.preventDefault()

                        let form = e.target

                        router.push({
                            ...location,
                            query: {
                                ...location.query,
                                q: form.elements["query"].value
                            }
                        })
                    }}
                >
                    <TextField
                        name="query"
                        placeholder="検索"
                    />
                </form>
                <EventCardList
                    events={this.state.events || []}
                />
            </section>
        )
    }
}
