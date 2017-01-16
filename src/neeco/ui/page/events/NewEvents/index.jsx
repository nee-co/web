let searchEvents  = require("neeco/api/event/searchEvents")
let Shadow        = require("neeco/ui/effect/Shadow")
let EventCardList = require("neeco/ui/view/EventCardList")
let FormButton    = require("neeco/ui/view/form/Button")
let Input         = require("neeco/ui/view/form/Input")
let classNames    = require("neeco/ui/page/events/NewEvents/classNames")
let React         = require("react")
let {Link}        = require("react-router")

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
                page   : 1,
                perPage: 10
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
                className={[className, classNames.NewEvents].join(" ")}
            >
                <form
                    className={classNames.SearchForm}
                    onSubmit={async (e) => {
                        e.preventDefault()

                        let formData = new FormData(e.target)

                        let events = await searchEvents({
                            apiHost: process.env.NEECO_API_HOST,
                            token  : token,
                            query  : formData.getAll("query"),
                            limit  : 10
                        })

                        this.setState({events: events})
                    }}
                >
                    <label>
                        <Input
                            name="query"
                            type="text"
                        />
                    </label>
                    <FormButton
                        className={classNames.SearchButton}
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
