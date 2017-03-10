let toTextContent    = require("neeco-client/dom/toTextContent")
let colorOfCollege   = require("neeco-client/graphics/colorOfCollege")
let React            = require("react")
let Card             = require("react-material/ui/view/Card")
let Image            = require("react-material/ui/view/Image")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemAvatar   = require("react-material/ui/view/ListItemAvatar")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")
let MaterialIcon     = require("react-material/ui/view/MaterialIcon")

let classNames = require("neeco-client/ui/view/group/GroupInviteeListItem/classNames")

module.exports = ({
    className,
    onRemove,
    user,
    ...props
}) =>
    <ListItem
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        to={"/users/" + user.number}
        {...props}
    >
        <ListItemAvatar
            alt={user.name}
            src={user.image}
        />
        <ListItemTextArea>
            <p>
                {user.name}
            </p>
            <p>
                <span
                    className={classNames.Number}
                    style={{
                        color: colorOfCollege(user.college)
                    }}
                >
                    {user.college.name}
                </span>
                {toTextContent(user.note)}
            </p>
        </ListItemTextArea>
        <ListItemIcon
            component={MaterialIcon}
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()

                onRemove()
            }}
            title="招待キャンセル"
        >
            remove_circle
        </ListItemIcon>
    </ListItem>
