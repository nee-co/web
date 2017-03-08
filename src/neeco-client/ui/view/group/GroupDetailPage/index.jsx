let GetGroupByID      = require("neeco-client/api/request/GetGroupByID")
let UpdateGroup       = require("neeco-client/api/request/UpdateGroup")
let ListGroupInvitees = require("neeco-client/api/request/ListGroupInvitees")
let ListGroupMembers  = require("neeco-client/api/request/ListGroupMembers")
let GroupSettingsPage = require("neeco-client/ui/view/group/GroupSettingsPage")
let UserListItem      = require("neeco-client/ui/view/user/UserListItem")
let React             = require("react")
let Image             = require("react-material/ui/view/Image")
let LinearLayout      = require("react-material/ui/view/LinearLayout")
let List              = require("react-material/ui/view/List")
let Tab               = require("react-material/ui/view/Tab")
let TabBar            = require("react-material/ui/view/TabBar")
let ViewPager         = require("react-material/ui/view/ViewPager")

let classNames = require("neeco-client/ui/view/group/GroupDetailPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            group   : undefined,
            invitees: undefined,
            members : undefined
        })
    }

    componentDidMount() {
        let {
            client,
            onError,
            params
        } = this.props

        let listInvitees = async offset => {
            let users = await client(ListGroupInvitees({
                group: {
                    id    : params["group_id"],
                    limit : 10,
                    offset: offset
                }
            }))

            return (
                users.length < 10 ? users
              :                     users.concat(await listInvitees(offset + 10))
            )
        }
        
        let listMembers = async offset => {
            let users = await client(ListGroupMembers({
                group: {
                    id    : params["group_id"],
                    limit : 10,
                    offset: offset
                }
            }))

            return (
                users.length < 10 ? users
              :                     users.concat(await listMembers(offset + 10))
            )
        }

        ;(async () => {
            this.setState({
                group  : await client(GetGroupByID({
                    group: {
                        id: params["group_id"]
                    }
                })),
                members: await listMembers(0)                
            })
        })()

        ;(async () => {
            try {
                this.setState({
                    invitees: await listInvitees(0)
                })
            } catch (e) {
                if (e instanceof Response && e.status.status == 403)
                    return
                else
                    onError(e)
            }
        })()
    }

    render() {
        let {
            client,
            location,
            router
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <div>
                    <LinearLayout
                        orientation="horizontal"
                    >
                        <Image
                            alt={this.state.group && this.state.group.name}
                            src={this.state.group && this.state.group.image}
                            width="64"
                            height="64"
                        />
                        <div
                            className={classNames.Text}
                        >
                            <h2>
                                {this.state.group && this.state.group.name}
                            </h2>
                        </div>
                    </LinearLayout>
                    <TabBar
                        location={location}
                    >
                        <Tab
                            to={{
                                ...location,
                                query: {
                                    "tab_index": "0"
                                }
                            }}
                        >
                            メンバー ({this.state.members && this.state.members.length})
                        </Tab>
                        {this.state.invitees && (
                            <Tab
                                to={{
                                    ...location,
                                    query: {
                                        "tab_index": "1"
                                    }
                                }}
                            >
                                招待中 ({this.state.invitees && this.state.invitees.length})
                            </Tab>
                        )}
                        {this.state.invitees && (
                            <Tab
                                to={{
                                    ...location,
                                    query: {
                                        "tab_index": "2"
                                    }
                                }}
                            >
                                設定
                            </Tab>
                        )}
                    </TabBar>
                </div>
                <ViewPager
                    selectedIndex={location.query["tab_index"] || 0}
                >
                    <List>
                        {this.state.members && this.state.members.map(
                            x =>
                                <UserListItem
                                    key={x.id}
                                    user={x}
                                />
                        )}
                    </List>
                    {this.state.invitees && (
                        <List>
                            {this.state.invitees && this.state.invitees.map(
                                x =>
                                    <UserListItem
                                        key={x.id}
                                        user={x}
                                    />
                            )}
                        </List>
                    )}
                    {this.state.invitees && (
                        <GroupSettingsPage
                            group={this.state.group}
                            onGroupUpdate={async x => {
                                this.setState({
                                    group: await client(UpdateGroup({
                                        group: x
                                    }))
                                })
                            }}
                        />
                    )}
                </ViewPager>
            </div>
        )
    }
}

