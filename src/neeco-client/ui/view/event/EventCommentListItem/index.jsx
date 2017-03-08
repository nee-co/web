let React            = require("react")
let Card             = require("react-material/ui/view/Card")
let Image            = require("react-material/ui/view/Image")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemAvatar   = require("react-material/ui/view/ListItemAvatar")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")

let classNames = require("neeco-client/ui/view/event/EventCommentListItem/classNames")

module.exports = ({
    comment,
    ...props
}) => 
    <ListItem
        {...props}
    >
        <ListItemAvatar
            alt={comment.postedBy.name}
            src={comment.postedBy.image}
        />
        <ListItemTextArea>
            <p>
                {comment.postedBy.name}
            </p>
            <p>
                {comment.body}
            </p>
        </ListItemTextArea>
        <div>
            <p>
                {((
                    date = new Date(comment.postedAt),
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
