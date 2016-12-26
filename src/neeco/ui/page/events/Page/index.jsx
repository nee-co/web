var Shadow        = require("neeco/ui/effect/Shadow")
var EntriedEvents = require("neeco/ui/page/events/EntriedEvents")
var NewEvents     = require("neeco/ui/page/events/NewEvents")
var OwnedEvents   = require("neeco/ui/page/events/OwnedEvents")
var LinkButton    = require("neeco/ui/view/LinkButton")
var ViewPager     = require("neeco/ui/view/ViewPager")
var Tab           = require("neeco/ui/view/navigation/Tab")
var TabBar        = require("neeco/ui/view/navigation/TabBar")
var classNames    = require("neeco/ui/page/events/Page/classNames")
var React         = require("react")
var {Link}        = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            tabIndex: 0
        })
    }

    render() {
        var {
            token
        } = this.props

        return (
            <section
                className={classNames.EventPage}
            >
                <Shadow
                    className={classNames.Header}
                >
                    <div>
                        <h2>イベント</h2>
                        <LinkButton
                            className={classNames.NewEventButton}
                            to="/event_creation"
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
                </Shadow>
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
            </section>
        )
    }
}
