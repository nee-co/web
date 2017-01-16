let addCommentToEvent   = require("neeco/api/event/addCommentToEvent")
let addUserToEvent      = require("neeco/api/event/addUserToEvent")
let getEventByID        = require("neeco/api/event/getEventByID")
let removeUserFromEvent = require("neeco/api/event/removeUserFromEvent")
let updateEvent         = require("neeco/api/event/updateEvent")
let sanitize            = require("neeco/encoding/html/sanitize")
let toHTML              = require("neeco/encoding/html/toHTML")
let Shadow              = require("neeco/ui/effect/Shadow")
let Button              = require("neeco/ui/view/Button")
let List                = require("neeco/ui/view/List")
let ListItem            = require("neeco/ui/view/ListItem")
let ListItemAvatar      = require("neeco/ui/view/ListItemAvatar")
let Tab                 = require("neeco/ui/view/Tab")
let TabBar              = require("neeco/ui/view/TabBar")
let ViewPager           = require("neeco/ui/view/ViewPager")
let FormButton          = require("neeco/ui/view/form/Button")
let TextField           = require("neeco/ui/view/form/TextField")
let classNames          = require("neeco/ui/page/event_detail/Page/classNames")
let React               = require("react")

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
        let selectedIndex = [
            "/events/" + params["event_id"],
            "/events/" + params["event_id"] + "/entries",
            "/events/" + params["event_id"] + "/comments"
        ]
            .findIndex((x) => x == location.pathname)

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
                            <img
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
                        selectedIndex={selectedIndex}
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
                    selectedIndex={selectedIndex}
                >
                    <div
                        className={classNames.EventDescription}
                        dangerouslySetInnerHTML={{
                            __html: this.state.event && sanitize(toHTML(this.state.event.description))
                        }}
                    />
                    <div>
                        <List>
                            {this.state.event && this.state.event.entries.map((x) =>
                                <ListItem
                                    key={x.id}
                                >
                                    {x.number + " " + x.name}
                                </ListItem>
                            )}
                        </List>
                    </div>
                    <div>
                        <List>
                            {this.state.event && Array.from(this.state.event.comments.entries()).map(([i, x]) =>
                                <ListItem
                                    key={i}
                                >
                                    <ListItemAvatar
                                        src={x.postedBy.image}
                                        alt=""
                                    />
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
                                        <p>
                                            {x.body}
                                        </p>
                                    </div>
                                </ListItem>
                            )}
                        </List>
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

