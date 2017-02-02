let getEvents     = require("neeco-client/api/event/getEvents")
let config        = require("neeco-client/config")
let EventCardList = require("neeco-client/ui/view/event/EventCardList")
let React         = require("react")
let Shadow        = require("react-material/ui/effect/Shadow")
let Button        = require("react-material/ui/view/Button")
let Input         = require("react-material/ui/view/form/Input")
let {Link}        = require("react-router")

let classNames = require("neeco-client/ui/view/event/EventListPage/classNames")

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
            this.setState({
                eventsPage: await getEvents({
                    apiHost: config["neeco_api_host"],
                    token  : token,
                    query  : "",
                    page   : 1,
                    perPage: 10
                })
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
                className={[className, classNames.Host].join(" ")}
            >
                <form
                    className={classNames.SearchForm}
                    onSubmit={async (e) => {
                        e.preventDefault()

                        let formData = new FormData(e.target)

                        this.setState({
                            events: await getEvents({
                                apiHost: config["neeco_api_host"],
                                token  : token,
                                query  : formData.getAll("query"),
                                limit  : 10
                            })
                        })
                    }}
                >
                    <label>
                        <Input
                            name="query"
                            type="text"
                        />
                    </label>
                    <Button
                        className={classNames.SearchButton}
                        component="button"
                    />
                </form>
                <EventCardList
                    events={
                        this.state.eventsPage ? this.state.eventsPage.data
                      :                         []
                    }
                />
            </section>
        )
    }
}
