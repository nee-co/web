let createEvent    = require("neeco-client/api/event/createEvent")
let apply          = require("neeco-client/apply")
let config         = require("neeco-client/config")
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
let {Link}         = require("react-router")

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
            onError,
            router,
            store
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
                            component={Link}
                            onClick={e => {
                                this.setState({
                                    newEventDialogIsVisible: true
                                })
                            }}
                            type="flat"
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
                            新着
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
                        onError={onError}
                        router={router}
                        store={store}
                    />
                    <EntriedEvents
                        onError={onError}
                        store={store}
                    />
                    <OwnedEvents
                        onError={onError}
                        store={store}
                    />
                </ViewPager>
                <NewEventDialog
                    onCancel={e => {
                        this.setState({
                            newEventDialogIsVisible: false
                        })
                    }}
                    onDone={async ({event}) => {
                        try {
                            await createEvent({
                                apiHost: config["neeco_api_host"],
                                token  : apply(store, "token"),
                                event  : event
                            })
                        } catch (e) {
                            onError(e)
                        }

                        this.setState({
                            newEventDialogIsVisible: false
                        })
                    }}
                    visible={this.state.newEventDialogIsVisible}
                />
            </Card>
        )
    }
}
