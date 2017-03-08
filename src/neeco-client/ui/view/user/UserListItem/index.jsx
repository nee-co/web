let colorOfCollege   = require("neeco-client/graphics/colorOfCollege")
let React            = require("react")
let Card             = require("react-material/ui/view/Card")
let Image            = require("react-material/ui/view/Image")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemAvatar   = require("react-material/ui/view/ListItemAvatar")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")

let classNames = require("neeco-client/ui/view/user/UserListItem/classNames")

module.exports = ({
    className,
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
                {user.note}
            </p>
        </ListItemTextArea>
    </ListItem>
