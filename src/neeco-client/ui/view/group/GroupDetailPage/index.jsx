let AddUserToGroup         = require("neeco-client/api/request/AddUserToGroup")
let AddUserToGroupInvitees = require("neeco-client/api/request/AddUserToGroupInvitees")
let GetGroupById           = require("neeco-client/api/request/GetGroupById")
let ListGroupInvitees      = require("neeco-client/api/request/ListGroupInvitees")
let ListGroupMembers       = require("neeco-client/api/request/ListGroupMembers")
let RemoveInviteeFromGroup = require("neeco-client/api/request/RemoveInviteeFromGroup")
let RemoveUserFromGroup    = require("neeco-client/api/request/RemoveUserFromGroup")
let UpdateGroup            = require("neeco-client/api/request/UpdateGroup")
let Markdown               = require("neeco-client/ui/view/Markdown")
let GroupInviteeListItem   = require("neeco-client/ui/view/group/GroupInviteeListItem")
let GroupSettingsPage      = require("neeco-client/ui/view/group/GroupSettingsPage")
let InviteGroupDialog      = require("neeco-client/ui/view/group/InviteGroupDialog")
let UserListItem           = require("neeco-client/ui/view/user/UserListItem")
let React                  = require("react")
let Button                 = require("react-material/ui/view/Button")
let Image                  = require("react-material/ui/view/Image")
let LinearLayout           = require("react-material/ui/view/LinearLayout")
let List                   = require("react-material/ui/view/List")
let ListItem               = require("react-material/ui/view/ListItem")
let Tab                    = require("react-material/ui/view/Tab")
let TabBar                 = require("react-material/ui/view/TabBar")
let ViewPager              = require("react-material/ui/view/ViewPager")
let DropdownButton         = require("react-material/ui/view/form/DropdownButton")

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
        let {withClient} = this.props

        withClient(async client => {
            let {onError} = this.props
            let {params} = this.props

            let listInvitees = async offset => {
                let users = await ListGroupInvitees({
                    group: {
                        id    : params["group_id"],
                        limit : 10,
                        offset: offset
                    }
                })(client.configuration)

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

            this.setState({
                group  : await client(GetGroupById({
                    group: {
                        id: params["group_id"]
                    }
                })),
                members: await listMembers(0)                
            })

            try {
                this.setState({
                    invitees: await listInvitees(0)
                })
            } catch (e) {
                if (
                    e instanceof Response
                 && (e.status == 403 || e.status == 404)
                )
                    return
                else
                    onError(e)
            }
        })
    }

    render() {
        let {
            client,
            location,
            params
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
                            {!this.state.invitees && (
                                <Button
                                    onClick={async e => {
                                        let x = await client(AddUserToGroup({
                                            group: {
                                                id: params["group_id"]
                                            }
                                        }))

                                        this.componentDidMount()
                                    }}
                                >
                                    参加
                                </Button>
                            )}
                            {this.state.invitees && (
                                <Button
                                    onClick={e => {
                                        this.setState({
                                            inviteGroupDialogIsVisible: true
                                        })
                                    }}
                                >
                                    招待
                                </Button>
                            )}
                        </div>
                    </LinearLayout>
                    <TabBar
                        location={location}
                    >
                        <Tab
                            to={"/groups/" + params["group_id"]}
                        >
                            ノート
                        </Tab>
                        <Tab
                            to={"/groups/" + params["group_id"] + "/members"}
                        >
                            メンバー ({this.state.members && this.state.members.length})
                        </Tab>
                        {this.state.invitees && (
                            <Tab
                                to={"/groups/" + params["group_id"] + "/invitees"}
                            >
                                招待中 ({this.state.invitees && this.state.invitees.length})
                            </Tab>
                        )}
                        {this.state.invitees && (
                            <Tab
                                to={"/groups/" + params["group_id"] + "/settings"}
                            >
                                設定
                            </Tab>
                        )}
                    </TabBar>
                </div>
                <ViewPager
                    selectedIndex={
                        [
                            "/groups/" + params["group_id"],
                            "/groups/" + params["group_id"] + "/members",
                            "/groups/" + params["group_id"] + "/invitees",
                            "/groups/" + params["group_id"] + "/settings"
                        ]
                            .findIndex(x => x == location.pathname)
                    }
                >
                    <Markdown
                        srcDoc={this.state.group && this.state.group.note}
                    />
                    <div>
                        <List>
                            {this.state.members && this.state.members.map(
                                x =>
                                    <UserListItem
                                        key={x.id}
                                        user={x}
                                    />
                            )}
                        </List>
                    </div>
                    {this.state.invitees && (
                        <div>
                            <List>
                                {this.state.invitees && this.state.invitees.map(
                                    x =>
                                        <GroupInviteeListItem
                                            key={x.id}
                                            onRemove={async () => {
                                                await client(RemoveInviteeFromGroup({
                                                    group: this.state.group,
                                                    user : x
                                                }))

                                                this.setState({
                                                    invitees: this.state.invitees.filter(y => y.id != x.id)
                                                })
                                            }}
                                            user={x}
                                        />
                                )}
                            </List>
                        </div>
                    )}
                    {this.state.invitees && (
                        <GroupSettingsPage
                            group={this.state.group}
                            onLeave={async e => {
                                let x = await client(RemoveUserFromGroup({
                                    group: {
                                        id: params["group_id"]
                                    }
                                }))

                                this.setState({
                                    invitees: undefined
                                })

                                this.componentDidMount()
                            }}
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
                <InviteGroupDialog
                    client={client}
                    invitees={this.state.invitees}
                    members={this.state.members}
                    onCancel={e => {
                        this.setState({
                            inviteGroupDialogIsVisible: false
                        })
                    }}
                    onDone={async user => {
                        await client(AddUserToGroupInvitees({
                            group: this.state.group,
                            user : user
                        }))

                        this.setState({
                            invitees: this.state.invitees.concat(user),
                            inviteGroupDialogIsVisible: false
                        })
                    }}
                    visible={this.state.inviteGroupDialogIsVisible}
                />
            </div>
        )
    }
}

