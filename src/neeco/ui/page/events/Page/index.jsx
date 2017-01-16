let Shadow        = require("neeco/ui/effect/Shadow")
let EntriedEvents = require("neeco/ui/page/events/EntriedEvents")
let NewEvents     = require("neeco/ui/page/events/NewEvents")
let OwnedEvents   = require("neeco/ui/page/events/OwnedEvents")
let Card          = require("neeco/ui/view/Card")
let LinkButton    = require("neeco/ui/view/LinkButton")
let ViewPager     = require("neeco/ui/view/ViewPager")
let Tab           = require("neeco/ui/view/Tab")
let TabBar        = require("neeco/ui/view/TabBar")
let classNames    = require("neeco/ui/page/events/Page/classNames")
let React         = require("react")
let {Link}        = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            tabIndex: 0
        })
    }

    render() {
        let {
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
                        onSelect={(index) => {
                            this.setState({
                                tabIndex: index
                            })
                        }}
                        selectedIndex={this.state.tabIndex}
                    >
                        <Tab>新着</Tab>
                        <Tab>参加中</Tab>
                        <Tab>管理中</Tab>
                    </TabBar>
                </div>
                <ViewPager
                    selectedIndex={this.state.tabIndex}
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
