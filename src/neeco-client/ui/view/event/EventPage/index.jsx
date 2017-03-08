let CreateEvent    = require("neeco-client/api/request/CreateEvent")
let NewEventDialog = require("neeco-client/ui/view/event/NewEventDialog")
let EntriedEvents  = require("neeco-client/ui/view/event/EntriedEventListPage")
let NewEvents      = require("neeco-client/ui/view/event/EventListPage")
let OwnedEvents    = require("neeco-client/ui/view/event/OwnedEventListPage")
let React          = require("react")
let Shadow         = require("react-material/ui/effect/Shadow")
let Button         = require("react-material/ui/view/Button")
let Card           = require("react-material/ui/view/Card")
let ViewPager      = require("react-material/ui/view/ViewPager")
let Tab            = require("react-material/ui/view/Tab")
let TabBar         = require("react-material/ui/view/TabBar")

let classNames = require("neeco-client/ui/view/event/EventPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            newEventDialogIsVisible: false
        })
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
                <ViewPager
                    selectedIndex={location.query["tab_index"] || 0}
                >
                    <NewEvents
                        location={location}
                        router={router}
                        client={client}
                    />
                    <EntriedEvents
                        client={client}
                    />
                    <OwnedEvents
                        client={client}
                    />
                </ViewPager>
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
