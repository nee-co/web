let getGroups = require("neeco-client/api/group/getGroups")
let apply     = require("neeco-client/apply")
let config    = require("neeco-client/config")
let React     = require("react")
let Button    = require("react-material/ui/view/Button")
let Card      = require("react-material/ui/view/Card")
let List      = require("react-material/ui/view/List")
let ListItem  = require("react-material/ui/view/ListItem")
let ViewPager = require("react-material/ui/view/ViewPager")
let Tab       = require("react-material/ui/view/Tab")
let TabBar    = require("react-material/ui/view/TabBar")
let {Link}    = require("react-router")

let classNames = require("neeco-client/ui/view/group/GroupPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            groups: [],
            error : undefined
        })
    }

    componentDidMount() {
        let {
            onError,
            store
        } = this.props

        ;(async () => {
            try {
                this.setState({
                    groups: await getGroups({
                        apiHost: config["neeco_api_host"],
                        token  : apply(store, "token"),
                        query  : "",
                        page   : 1,
                        per    : 10
                    })
                })
            } catch (e) {
                onError(e)
            }
        })()
    }

    render() {
        let {
            location,
            store
        } = this.props

        return (
            <section
                className={classNames.Host}
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
                        >
                            グループ作成
                        </Button>
                    </div>
                    <TabBar
                        location={location}
                    >
                        <Tab
                            to={{
                                pathname: "/groups",
                                query   : {
                                    "tab_index": "0"
                                }
                            }}
                        >
                            新着
                        </Tab>
                        <Tab
                            to={{
                                pathname: "/groups",
                                query   : {
                                    "tab_index": "1"
                                }
                            }}
                        >
                            参加中
                        </Tab>
                        <Tab
                            to={{
                                pathname: "/groups",
                                query   : {
                                    "tab_index": "2"
                                }
                            }}
                        >
                            管理中
                        </Tab>
                    </TabBar>
                </div>
                <ViewPager>
                    <div>
                        <List>
                            {this.state.groups && this.state.groups.map(x => 
                                <ListItem>
                                    {x.name}
                                </ListItem>
                            )}
                        </List>
                    </div>
                </ViewPager>
            </section>
        )
    }
}
