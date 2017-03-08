let AddUserToEvent       = require("neeco-client/api/request/AddUserToEvent")
let CreateComment        = require("neeco-client/api/request/CreateComment")
let GetEventByID         = require("neeco-client/api/request/GetEventByID")
let RemoveUserFromEvent  = require("neeco-client/api/request/RemoveUserFromEvent")
let Markdown             = require("neeco-client/ui/view/Markdown")
let EventCommentListItem = require("neeco-client/ui/view/event/EventCommentListItem")
let EventEditPage        = require("neeco-client/ui/view/event/EventEditPage")
let UserListItem         = require("neeco-client/ui/view/user/UserListItem")
let React                = require("react")
let Shadow               = require("react-material/ui/effect/Shadow")
let Button               = require("react-material/ui/view/Button")
let FlexibleSpace        = require("react-material/ui/view/FlexibleSpace")
let Image                = require("react-material/ui/view/Image")
let List                 = require("react-material/ui/view/List")
let ListItem             = require("react-material/ui/view/ListItem")
let ListItemAvatar       = require("react-material/ui/view/ListItemAvatar")
let ListItemTextArea     = require("react-material/ui/view/ListItemTextArea")
let Tab                  = require("react-material/ui/view/Tab")
let TabBar               = require("react-material/ui/view/TabBar")
let ViewPager            = require("react-material/ui/view/ViewPager")
let DropdownButton       = require("react-material/ui/view/form/DropdownButton")
let TextField            = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/event/EventDetailPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            event: undefined
        })
    }

    componentDidMount() {
        let {
            client,
            params
        } = this.props

        ;(async () => {
            this.setState({
                event: await client(GetEventByID({
                    id: params["event_id"]
                }))
            })
        })()
    }

    render() {
        let {
            client,
            location,
            params,
            user
        } = this.props

        let loaded = this.state.event && user

        let isEntried = loaded && this.state.event.entries.some(x => x.id == user.id)

        let isOwner = loaded && this.state.event.owner.id == user.id

        let isPublic = this.state.event && this.state.event.isPublic

        return (
            <article
                className={classNames.Host}
            >
                <div
                    className={classNames.Header}
                >
                    <div>
                        {isOwner && 
                        <div>
                            {
                                isPublic ? "公開中"
                              :            "非公開"　
                            }
                        </div>
                        }
                        {!isOwner && (
                            <DropdownButton
                                onChange={async _ => {
                                    if (isEntried) {
                                        let responce = await client(RemoveUserFromEvent({
                                            event: this.state.event
                                        }))

                                        this.state.event.entries = this.state.event.entries.filter(
                                            x => x.id != user.id
                                        )
                                    } else {
                                        let responce = await client(AddUserToEvent({
                                            event: this.state.event
                                        }))

                                        this.state.event.entries.push(user)
                                    }

                                    this.forceUpdate()
                                }}
                                value={
                                    isEntried ? "参加"
                                  :             "未参加"
                                }
                            >
                                <ListItem>
                                    参加
                                </ListItem>
                                <ListItem>
                                    未参加
                                </ListItem>
                            </DropdownButton>
                        )}
                    </div>
                    <TabBar
                        location={location}
                    >
                        <Tab
                            to={"/events/" + params["event_id"]}
                        >
                            概要
                        </Tab>
                        <Tab
                            to={"/events/" + params["event_id"] + "/entries"}
                        >
                            参加者 ({this.state.event && this.state.event.entries.length})
                        </Tab>
                        <Tab
                            to={"/events/" + params["event_id"] + "/comments"}
                        >
                            コメント
                        </Tab>
                        {isOwner &&
                            <Tab
                                to={"/events/" + params["event_id"] + "/edit"}
                            >
                                編集
                            </Tab>
                        }
                    </TabBar>
                </div>
                <ViewPager
                    selectedIndex={
                        [
                            "/events/" + params["event_id"],
                            "/events/" + params["event_id"] + "/entries",
                            "/events/" + params["event_id"] + "/comments",
                            "/events/" + params["event_id"] + "/edit"
                        ]
                            .findIndex(x => x == location.pathname)
                    }
                >
                    <div>
                        <div className={classNames.HeaderInfo}>
                            <div>
                                <h2>
                                    {this.state.event && this.state.event.title}
                                </h2>
                                {this.state.event && this.state.event.startDate}
                            </div>
                            <Image
                                src={this.state.event && this.state.event.image}
                                alt={this.state.event && this.state.event.title}
                                width="128"
                                height="128"
                                onNext={e => {
                                    let img = e.target

                                    let canvas = document.createElement("canvas")
                                    canvas.width = img.width
                                    canvas.height = img.height

                                    let context = canvas.getContext("2d")
                                    context.drawImage(img, 0, 0)

                                    this.setState({
                                        /*colorMap: createColorMap({
                                            imageData: context.getImageData(0, 0, img.width, img.height),
                                            
                                        })*/
                                    })
                                }}
                            />
                        </div>
                        <Markdown
                            className={classNames.EventDescription}
                            srcDoc={this.state.event && this.state.event.description}
                        />
                    </div>
                    <div>
                        <List>
                            {this.state.event && this.state.event.entries.map(x =>
                                <UserListItem
                                    key={x.id}
                                    user={x}
                                />
                            )}
                        </List>
                    </div>
                    <div>
                        <List>
                            {this.state.event && Array.from(this.state.event.comments.entries()).map(
                                ([i, x]) =>
                                    <EventCommentListItem
                                        comment={x}
                                        key={i}
                                    />
                            )}
                        </List>
                        <FlexibleSpace />
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                let responce = await client(CreateComment({
                                    event  : this.state.event,
                                    comment: {
                                        body: form.elements["comment"].value
                                    }
                                }))

                                this.componentDidMount()
                            }}
                        >
                            <TextField
                                hintText={"コメント"}
                                name="comment"
                            />
                            <Button
                                component="button"
                            >
                                送信
                            </Button>
                        </form>
                    </div>
                    {isOwner && this.state.event &&
                        <EventEditPage
                            client={client}
                            event={this.state.event}
                            onChange={event => {
                                this.setState({
                                    event: {
                                        ...this.state.event,
                                        ...event
                                    }
                                })
                            }}
                        />
                    }
                </ViewPager>
            </article>
        )
    }
}
