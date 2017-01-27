let addCommentToEvent   = require("neeco/api/event/addCommentToEvent")
let addUserToEvent      = require("neeco/api/event/addUserToEvent")
let getEventByID        = require("neeco/api/event/getEventByID")
let removeUserFromEvent = require("neeco/api/event/removeUserFromEvent")
let updateEvent         = require("neeco/api/event/updateEvent")
let Markdown            = require("neeco/ui/view/Markdown")
let React               = require("react")
let Shadow              = require("react-material/ui/effect/Shadow")
let Button              = require("react-material/ui/view/Button")
let FlexibleSpace       = require("react-material/ui/view/FlexibleSpace")
let Image               = require("react-material/ui/view/Image")
let List                = require("react-material/ui/view/List")
let ListItem            = require("react-material/ui/view/ListItem")
let ListItemAvatar      = require("react-material/ui/view/ListItemAvatar")
let ListItemTextArea    = require("react-material/ui/view/ListItemTextArea")
let Tab                 = require("react-material/ui/view/Tab")
let TabBar              = require("react-material/ui/view/TabBar")
let ViewPager           = require("react-material/ui/view/ViewPager")
let FormButton          = require("react-material/ui/view/form/Button")
let TextField           = require("react-material/ui/view/form/TextField")

let classNames = require("neeco/ui/page/event_detail/Page/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            event   : undefined
        })
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps({
        token,
        params
    }) {
        (async () => {
            let event = await getEventByID({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                id     : params["event_id"]
            })

            this.setState({event: event})
        })()
    }

    render() {
        let {
            location,
            params,
            token,
            user
        } = this.props

        let isOwner   = this.state.event && this.state.event.owner.id == user.id
        let isEntried = this.state.event && this.state.event.entries.find((x) => x.id == user.id)

        return (
            <article
                className={classNames.EventDetailPage}
            >
                <Shadow
                    className={classNames.Header}
                >
                    <div>
                        <div className={classNames.HeaderInfo}>
                            <div>
                                <h2>{this.state.event && this.state.event.title}</h2>
                                {this.state.event && this.state.event.startDate}
                            </div>
                            <Image
                                src={this.state.event && this.state.event.image}
                                alt={this.state.event && this.state.event.title}
                                width="128"
                                height="128"
                            />
                        </div>
                        {
                            isOwner && this.state.event && this.state.event ? (
                                <Button
                                    onClick={async () => {
                                        let responce = await updateEvent({
                                            apiHost : process.env.NEECO_API_HOST,
                                            token   : token,
                                            id      : this.state.event.id,
                                            isPublic: true
                                        })

                                        this.componentWillReceiveProps(this.props)
                                    }}
                                    type="raised"
                                >
                                    公開する
                                </Button>
                            )
                          : isEntried ? (
                                <Button
                                    onClick={async () => {
                                        let responce = await removeUserFromEvent({
                                            apiHost: process.env.NEECO_API_HOST,
                                            token  : token,
                                            eventID: this.state.event.id 
                                        })

                                        this.componentWillReceiveProps(this.props)
                                    }}
                                    type="raised"
                                >
                                    キャンセル
                                </Button>
                            )
                          :             (
                                <Button
                                    onClick={async () => {
                                        let responce = await addUserToEvent({
                                            apiHost: process.env.NEECO_API_HOST,
                                            token  : token,
                                            eventID: this.state.event.id 
                                        })

                                        this.componentWillReceiveProps(this.props)
                                    }}
                                    type="raised"
                                >
                                    参加
                                </Button>
                            )
                        }
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
                </Shadow>
                <ViewPager
                    selectedIndex={
                        [
                            "/events/" + params["event_id"],
                            "/events/" + params["event_id"] + "/entries",
                            "/events/" + params["event_id"] + "/comments"
                        ]
                            .findIndex((x) => x == location.pathname)
                    }
                >
                    <Markdown
                        className={classNames.EventDescription}
                        srcDoc={this.state.event && this.state.event.description}
                    />
                    <div>
                        <List>
                            {this.state.event && this.state.event.entries.map((x) =>
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
                                        src={x.postedBy.image}
                                        alt={x.postedBy.name}
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
                            onSubmit={async (e) => {
                                e.preventDefault()

                                let formData = new FormData(e.target)

                                let responce = await addCommentToEvent({
                                    apiHost: process.env.NEECO_API_HOST,
                                    token  : token,
                                    eventID: this.state.event.id,
                                    comment: {
                                        body: formData.get("comment")
                                    }
                                })

                                this.componentWillReceiveProps(this.props)
                            }}
                        >
                            <TextField
                                hintText={"コメント"}
                                name="comment"
                            />
                            <FormButton>
                                送信
                            </FormButton>
                        </form>
                    </div>
                </ViewPager>
            </article>
        )
    }
}

