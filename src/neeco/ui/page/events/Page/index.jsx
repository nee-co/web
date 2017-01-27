let EntriedEvents = require("neeco/ui/page/events/EntriedEvents")
let NewEvents     = require("neeco/ui/page/events/NewEvents")
let OwnedEvents   = require("neeco/ui/page/events/OwnedEvents")
let React         = require("react")
let Shadow        = require("react-material/ui/effect/Shadow")
let Card          = require("react-material/ui/view/Card")
let LinkButton    = require("react-material/ui/view/LinkButton")
let ViewPager     = require("react-material/ui/view/ViewPager")
let Tab           = require("react-material/ui/view/Tab")
let TabBar        = require("react-material/ui/view/TabBar")
let {Link}        = require("react-router")

let classNames = require("neeco/ui/page/events/Page/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
        })
    }

    render() {
        let {
            location,
            token
        } = this.props

        return (
            <Card
                className={classNames.EventPage}
                component={"section"}
            >
                <div
                    className={classNames.Header}
                >
                    <div className={classNames.Summary}>
                        <h2>イベント</h2>
                        <LinkButton
                            className={classNames.NewEventButton}
                            to="/event_creation"
                            type="raised"
                        >
                            イベント作成
                        </LinkButton>
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
                        token={token}
                    />
                    <EntriedEvents
                        token={token}
                    />
                    <OwnedEvents
                        token={token}
                    />
                </ViewPager>
            </Card>
        )
    }
}
