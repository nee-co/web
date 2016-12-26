var getEventByID   = require("neeco/api/event/getEventByID")
var addUserToEvent = require("neeco/api/event/addUserToEvent")
var Shadow         = require("neeco/ui/effect/Shadow")
var Button         = require("neeco/ui/view/Button")
var List           = require("neeco/ui/view/List")
var ListItem       = require("neeco/ui/view/ListItem")
var ViewPager      = require("neeco/ui/view/ViewPager")
var Tab            = require("neeco/ui/view/navigation/Tab")
var TabBar         = require("neeco/ui/view/navigation/TabBar")
var classNames     = require("neeco/ui/page/event_detail/Page/classNames")
var React          = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            event   : undefined,
            tabIndex: 0
        })
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps({
        token,
        params
    }) {
        (async () => {
            var event = await getEventByID({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                id     : params["event_id"]
            })

            this.setState({event: event})
        })()
    }

    render() {
        var {
            token
        } = this.props

        return (
            <article
                className={classNames.EventDetailPage}
            >
                <Shadow
                    className={classNames.Header}
                >
                    <div>
                        <div className={classNames.HeaderInfo}>
                            <div>
                                <h2>{this.state.event && this.state.event.title}</h2>
                                {this.state.event && this.state.event.startDate}
                            </div>
                            <img
                                src={this.state.event && this.state.event.image}
                                alt={this.state.event && this.state.event.title}
                                width="128"
                                height="128"
                            />
                        </div>
                        <Button
                            onClick={async () => {
                                var responce = await addUserToEvent({
                                    apiHost: process.env.NEECO_API_HOST,
                                    token  : token,
                                    eventID: this.state.event.id 
                                })

                                this.componentWillReceiveProps(this.props)
                            }}
                        >
                            参加
                        </Button>
                    </div>
                    <TabBar
                        selectedIndex={this.state.tabIndex}
                        onSelect={(index) => {
                            this.setState({
                                tabIndex: index
                            })
                        }}
                    >
                        <Tab>概要</Tab>
                        <Tab>
                            メンバー ({this.state.event && this.state.event.entries.length})
                        </Tab>
                    </TabBar>
                </Shadow>
                <ViewPager
                    selectedIndex={this.state.tabIndex}
                >
                    <section className={classNames.EventDescription}>
                        {this.state.event && this.state.event.description}
                    </section>
                    <section className={classNames.EventMembers}>
                        <List>
                            {this.state.event && this.state.event.entries.map((x) =>
                                <ListItem
                                    key={x.id}
                                >
                                    {x.number + " " + x.name}
                                </ListItem>
                            )}
                        </List>
                    </section>
                </ViewPager>
            </article>
        )
    }
}

