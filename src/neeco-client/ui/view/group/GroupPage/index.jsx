let CreateGroup     = require("neeco-client/api/request/CreateGroup")
let ListGroups      = require("neeco-client/api/request/ListGroups")
let GroupList       = require("neeco-client/ui/view/group/GroupList")
let GroupListItem   = require("neeco-client/ui/view/group/GroupListItem")
let GroupSearchPage = require("neeco-client/ui/view/group/GroupSearchPage")
let NewGroupDialog  = require("neeco-client/ui/view/group/NewGroupDialog")
let React           = require("react")
let Button          = require("react-material/ui/view/Button")
let Card            = require("react-material/ui/view/Card")
let List            = require("react-material/ui/view/List")
let ListItem        = require("react-material/ui/view/ListItem")
let MaterialIcon    = require("react-material/ui/view/MaterialIcon")
let Tab             = require("react-material/ui/view/Tab")
let TabBar          = require("react-material/ui/view/TabBar")
let ViewPager       = require("react-material/ui/view/ViewPager")

let classNames = require("neeco-client/ui/view/group/GroupPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            groups                 : undefined,
            invitedGroups          : undefined,
            joinedGroups           : undefined,
            loading                : false,
            pageNumber             : 0,
            newGroupDialogIsVisible: false
        })
    }

    componentDidMount() {
        let {withClient} = this.props

        withClient(async client => {
            let listInvitedGroups = async offset => {
                let x = await client(ListGroups({
                    query  : "",
                    invited: true,
                    limit  : 10,
                    offset : offset
                }))

                return (
                    x.length < 10 ? x
                  :                 x.concat(await listInvitedGroups(offset + 10))
                )
            }
            
            let listJoinedGroups = async offset => {
                let x = await client(ListGroups({
                    query : "",
                    joined: true,
                    limit : 10,
                    offset: offset
                }))

                return (
                    x.length < 10 ? x
                  :                 x.concat(await listJoinedGroups(offset + 10))
                )
            }

            this.setState({
                invitedGroups: await listInvitedGroups(0),
                joinedGroups : await listJoinedGroups(0)
            })
        })
    }

    componentWillReceiveProps({
        location,
        client
    }) {
        if (location.query["q"] != this.props.location.query["q"]) {
            this.setState({
                groups    : undefined,
                pageNumber: 0
            })
        }
    }

    render() {
        let {
            location,
            client,
            router
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
                            onClick={e => {
                                this.setState({
                                    newGroupDialogIsVisible: true
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
                                ...location,
                                query   : {
                                    "tab_index": "0"
                                }
                            }}
                        >
                            検索
                        </Tab>
                        <Tab
                            to={{
                                ...location,
                                query   : {
                                    "tab_index": "1"
                                }
                            }}
                        >
                            参加中 ({this.state.joinedGroups && this.state.joinedGroups.length})
                        </Tab>
                        <Tab
                            to={{
                                ...location,
                                query   : {
                                    "tab_index": "2"
                                }
                            }}
                        >
                            招待 ({this.state.invitedGroups && this.state.invitedGroups.length})
                        </Tab>
                    </TabBar>
                </div>
                <ViewPager
                    selectedIndex={location.query["tab_index"] || 0}
                >
                    <GroupSearchPage
                        groups={this.state.groups}
                        loading={this.state.loading}
                        onQuery={query => {
                            router.push({
                                ...location,
                                query: {
                                    ...location.query,
                                    q: query
                                }
                            })
                        }}
                        onNext={async e => {
                            this.setState({
                                loading: true
                            })

                            let groups = await client(ListGroups({
                                query  : location.query["q"] || "",
                                page   : this.state.pageNumber + 1,
                                perPage: 10
                            }))

                            groups.splice(0, 0, ...(this.state.groups || []))

                            this.setState({
                                groups    : groups,
                                pageNumber: this.state.pageNumber + 1,
                                loading   : false
                            })
                        }}
                    />
                    <div>
                        <GroupList>
                            {this.state.joinedGroups && this.state.joinedGroups.map(
                                x =>
                                    <GroupListItem
                                        key={x.id}
                                        group={x}
                                    />
                            )}
                        </GroupList>
                    </div>
                    <div>
                        <GroupList>
                            {this.state.invitedGroups && this.state.invitedGroups.map(
                                x =>
                                    <GroupListItem
                                        key={x.id}
                                        group={x}
                                    />
                            )}
                        </GroupList>
                    </div>
                </ViewPager>
                <NewGroupDialog
                    onCancel={e => {
                        this.setState({
                            newGroupDialogIsVisible: false
                        })
                    }}
                    onDone={async group => {
                        let x = await client(CreateGroup({
                            group: group
                        }))

                        router.push("/groups/" + x.id)
                    }}
                    visible={this.state.newGroupDialogIsVisible}
                />
            </section>
        )
    }
}
