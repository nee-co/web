let AddUserToGroup      = require("neeco-client/api/request/AddUserToGroup")
let GetGroupByID        = require("neeco-client/api/request/GetGroupByID")
let ListGroupInvitees   = require("neeco-client/api/request/ListGroupInvitees")
let ListGroupMembers    = require("neeco-client/api/request/ListGroupMembers")
let RemoveUserFromGroup = require("neeco-client/api/request/RemoveUserFromGroup")
let UpdateGroup         = require("neeco-client/api/request/UpdateGroup")
let Markdown            = require("neeco-client/ui/view/Markdown")
let GroupSettingsPage   = require("neeco-client/ui/view/group/GroupSettingsPage")
let UserListItem        = require("neeco-client/ui/view/user/UserListItem")
let React               = require("react")
let Image               = require("react-material/ui/view/Image")
let LinearLayout        = require("react-material/ui/view/LinearLayout")
let List                = require("react-material/ui/view/List")
let ListItem            = require("react-material/ui/view/ListItem")
let Tab                 = require("react-material/ui/view/Tab")
let TabBar              = require("react-material/ui/view/TabBar")
let ViewPager           = require("react-material/ui/view/ViewPager")
let DropdownButton      = require("react-material/ui/view/form/DropdownButton")

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
            configuration,
            onError,
            params
        } = this.props

        let listInvitees = async offset => {
            let users = await ListGroupInvitees({
                group: {
                    id    : params["group_id"],
                    limit : 10,
                    offset: offset
                }
            })(configuration)

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
                if (e instanceof Response && e.status == 403)
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
                            <DropdownButton
                                value={
                                    this.state.invitees == undefined ? "未参加"
                                  :                                    "参加"
                                }
                            >
                                <ListItem
                                    onClick={async _ => {
                                        let x = await client(AddUserToGroup({
                                            group: {
                                                id: params["group_id"]
                                            }
                                        }))

                                        this.componentDidMount()
                                    }}
                                >
                                    参加
                                </ListItem>
                                <ListItem
                                    onClick={async _ => {
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
                                >
                                    未参加
                                </ListItem>
                            </DropdownButton>
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

