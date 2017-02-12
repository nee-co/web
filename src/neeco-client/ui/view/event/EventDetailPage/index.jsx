let addUserToEvent      = require("neeco-client/api/event/addUserToEvent")
let createComment       = require("neeco-client/api/event/createComment")
let getEventByID        = require("neeco-client/api/event/getEventByID")
let removeUserFromEvent = require("neeco-client/api/event/removeUserFromEvent")
let updateEvent         = require("neeco-client/api/event/updateEvent")
let apply               = require("neeco-client/apply")
let config              = require("neeco-client/config")
let Markdown            = require("neeco-client/ui/view/Markdown")
let React               = require("react")
let Shadow              = require("react-material/ui/effect/Shadow")
let Button              = require("react-material/ui/view/Button")
let DropDownButton      = require("react-material/ui/view/DropDownButton")
let FlexibleSpace       = require("react-material/ui/view/FlexibleSpace")
let Image               = require("react-material/ui/view/Image")
let List                = require("react-material/ui/view/List")
let ListItem            = require("react-material/ui/view/ListItem")
let ListItemAvatar      = require("react-material/ui/view/ListItemAvatar")
let ListItemTextArea    = require("react-material/ui/view/ListItemTextArea")
let Tab                 = require("react-material/ui/view/Tab")
let TabBar              = require("react-material/ui/view/TabBar")
let ViewPager           = require("react-material/ui/view/ViewPager")
let TextField           = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/event/EventDetailPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            event: undefined
        })
    }

    componentDidMount() {
        let {
            onError,
            params,
            store
        } = this.props

        ;(async () => {
            try {
                let event = await getEventByID({
                    apiHost: config["neeco_api_host"],
                    token  : apply(store, "token"),
                    id     : params["event_id"]
                })

                this.setState({event: event})
            } catch (e) {
                onError(e)
            }
        })()
    }

    render() {
        let {
            location,
            onError,
            params,
            store,
        } = this.props

        let isEntried = this.state.event && this.state.event.entries.find(x => x.id == apply(store, "user").id)
        let isOwner   = this.state.event && this.state.event.owner.id == apply(store, "user").id
        let isPublic  = this.state.event && this.state.event.isPublic

        return (
            <article
                className={classNames.Host}
            >
                <div
                    className={classNames.Header}
                >
                    <div>
                        {isOwner && (
                            <DropDownButton
                                onChange={async () => {
                                    try {
                                        let responce = await updateEvent({
                                            apiHost : config["neeco_api_host"],
                                            token   : apply(store, "token"),
                                            event   : {
                                                id      : this.state.event.id,
                                                isPublic: !isPublic
                                            }
                                        })
                                        this.state.event.isPublic = !isPublic

                                        this.forceUpdate()
                                    } catch (e) {
                                        onError(e)
                                    }
                                }}
                            >
                                <ListItem
                                    selected={isPublic}
                                >
                                    公開
                                </ListItem>
                                <ListItem
                                    selected={!isPublic}
                                >
                                    非公開
                                </ListItem>
                            </DropDownButton>
                        )}
                        {!isOwner && (
                            <DropDownButton
                                onChange={async () => {
                                    try {
                                        if (isEntried) {
                                            let responce = await addUserToEvent({
                                                apiHost: config["neeco_api_host"],
                                                token  : apply(store, "token"),
                                                event  : this.state.event
                                            })

                                            this.state.event.entries = this.state.event.entries.filter(
                                                x => x.id != apply(store, "user").id
                                            )

                                            this.forceUpdate()
                                        } else {
                                            let responce = await removeUserFromEvent({
                                                apiHost: config["neeco_api_host"],
                                                token  : apply(store, "token"),
                                                event  : this.state.event
                                            })

                                            this.state.event.entries.push(apply(store, "user"))

                                            this.forceUpdate()
                                        }
                                    } catch (e) {
                                        onError(e)
                                    }
                                }}
                            >
                                <ListItem
                                    selected={isEntried}
                                >
                                    参加
                                </ListItem>
                                <ListItem
                                    selected={!isEntried}
                                >
                                    参加キャンセル
                                </ListItem>
                            </DropDownButton>
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
                    </TabBar>
                </div>
                <ViewPager
                    selectedIndex={
                        [
                            "/events/" + params["event_id"],
                            "/events/" + params["event_id"] + "/entries",
                            "/events/" + params["event_id"] + "/comments"
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
                                <ListItem
                                    key={x.id}
                                >
                                    <ListItemAvatar
                                        src={x.image}
                                        alt={x.name}
                                    />
                                    <ListItemTextArea>
                                        {x.name}
                                    </ListItemTextArea>
                                </ListItem>
                            )}
                        </List>
                    </div>
                    <div
                        className={classNames.CommentPage}
                    >
                        <List>
                            {this.state.event && Array.from(this.state.event.comments.entries()).map(([i, x]) =>
                                <ListItem
                                    key={i}
                                >
                                    <ListItemAvatar
                                        alt={x.postedBy.name}
                                        src={x.postedBy.image}
                                    />
                                    <ListItemTextArea>
                                        <p>
                                            {x.postedBy.name}
                                        </p>
                                        <p>
                                            {x.body}
                                        </p>
                                    </ListItemTextArea>
                                    <div>
                                        <p>
                                            {((
                                                date = new Date(x.postedAt),
                                                d = (Date.now() - date.getTime()) / 1000
                                            ) =>
                                                d < 60    ? "now"
                                              : d < 3600  ? Math.floor(d / 60) + " min"
                                              : d < 86400 ? Math.floor(d / 3600) + " hour"
                                              :             date.toLocaleString()
                                            )()}
                                        </p>
                                    </div>
                                </ListItem>
                            )}
                        </List>
                        <FlexibleSpace />
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                try {
                                    let responce = await createComment({
                                        apiHost: config["neeco_api_host"],
                                        token  : apply(store, "token"),
                                        event  : this.state.event,
                                        comment: {
                                            body: form.elements["comment"].value
                                        }
                                    })

                                    this.componentDidMount()
                                } catch (e) {
                                    onError(e)
                                }
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
                </ViewPager>
            </article>
        )
    }
}
