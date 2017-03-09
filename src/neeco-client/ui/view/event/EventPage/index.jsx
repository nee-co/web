let CreateEvent     = require("neeco-client/api/request/CreateEvent")
let ListEvents      = require("neeco-client/api/request/ListEvents")
let EntriedEvents   = require("neeco-client/ui/view/event/EntriedEventListPage")
let EventSearchPage = require("neeco-client/ui/view/event/EventSearchPage")
let NewEventDialog  = require("neeco-client/ui/view/event/NewEventDialog")
let OwnedEvents     = require("neeco-client/ui/view/event/OwnedEventListPage")
let React           = require("react")
let Shadow          = require("react-material/ui/effect/Shadow")
let Button          = require("react-material/ui/view/Button")
let Card            = require("react-material/ui/view/Card")
let Tab             = require("react-material/ui/view/Tab")
let TabBar          = require("react-material/ui/view/TabBar")
let ViewPager       = require("react-material/ui/view/ViewPager")

let classNames = require("neeco-client/ui/view/event/EventPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            newEventDialogIsVisible: false,
            searchEvents: undefined,
            searchEventsPageNumber: 0,
            searchEventsLoading: false
        })
    }

    componentWillReceiveProps({
        location,
        client
    }) {
        if (location.query["q"] != this.props.location.query["q"]) {
            this.setState({
                searchEvents: undefined,
                searchEventsPageNumber: 0,
                searchEventsLoading: false
            })
        }
    }

    render() {
        let {
            location,
            router,
            client
        } = this.props

        return (
            <Card
                className={classNames.Host}
                component={"section"}
            >
                <div
                    className={classNames.Header}
                >
                    <div>
                        <Button
                            onClick={e => {
                                this.setState({
                                    newEventDialogIsVisible: true
                                })
                            }}
                        >
                            イベント作成
                        </Button>
                    </div>
                    <TabBar
                        location={location}
                    >
                        <Tab
                            to={{
                                pathname: "/events",
                                query   : {
                                    "tab_index": "0"
                                }
                            }}
                        >
                            検索
                        </Tab>
                        <Tab
                            to={{
                                pathname: "/events",
                                query   : {
                                    "tab_index": "1"
                                }
                            }}
                        >
                            参加中
                        </Tab>
                        <Tab
                            to={{
                                pathname: "/events",
                                query   : {
                                    "tab_index": "2"
                                }
                            }}
                        >
                            管理中
                        </Tab>
                    </TabBar>
                </div>
                <div>
                    <ViewPager
                        selectedIndex={location.query["tab_index"] || 0}
                    >
                        <EventSearchPage
                            events={this.state.searchEvents}
                            loading={this.state.searchEventsLoading}
                            onNext={async e => {
                                this.setState({
                                    searchEventsLoading: true
                                })

                                let events = await client(ListEvents({
                                    query  : location.query["q"] || "",
                                    page   : this.state.searchEventsPageNumber + 1,
                                    perPage: 10
                                }))

                                events.splice(0, 0, ...(this.state.searchEvents || []))

                                this.setState({
                                    searchEvents          : events,
                                    searchEventsLoading   : false,
                                    searchEventsPageNumber: this.state.searchEventsPageNumber + 1
                                })
                            }}
                            onSearch={x => 
                                router.push({
                                    ...location,
                                    query: {
                                        ...location.query,
                                        q: x
                                    }
                                })
                            }
                        />
                        <EntriedEvents
                            client={client}
                        />
                        <OwnedEvents
                            client={client}
                        />
                    </ViewPager>
                </div>
                <NewEventDialog
                    onCancel={e => {
                        this.setState({
                            newEventDialogIsVisible: false
                        })
                    }}
                    onDone={async event => {
                        let x = await client(CreateEvent({
                            event: event
                        }))

                        router.push("/events/" + x.id)
                    }}
                    visible={this.state.newEventDialogIsVisible}
                />
            </Card>
        )
    }
}
