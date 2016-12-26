var searchEvents  = require("neeco/api/event/searchEvents")
var Shadow        = require("neeco/ui/effect/Shadow")
var EventCardList = require("neeco/ui/view/EventCardList")
var EventList     = require("neeco/ui/view/EventList")
var FormButton    = require("neeco/ui/view/form/Button")
var Input         = require("neeco/ui/view/form/Input")
var classNames    = require("neeco/ui/page/events/NewEvents/classNames")
var React         = require("react")
var {Link}        = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events: []
        })
    }

    componentDidMount() {
        var {
            token
        } = this.props

        ;(async () => {
            var events = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                query  : "",
                limit  : 10
            })

            this.setState({
                events: events
            })
        })()
    }

    render() {
        var {
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

                        var formData = new FormData(e.target)

                        var events = await searchEvents({
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
                    events={this.state.events}
                />
            </section>
        )
    }
}
