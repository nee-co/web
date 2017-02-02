let FontAwesomeIcon = require("neeco-client/ui/view/FontAwesomeIcon")
let React           = require("react")

let classNames = require("neeco-client/ui/view/file/FileListItem/classNames")

module.exports = ({
    className,
    file,
    selected,
    ...props
}) =>
    <tr
        {...props}
        className={
            [
                className,
                classNames.Host,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
    >
        <td>
            <FontAwesomeIcon
                children={
                    file.kind == "folder" ? "\uF114"
                  :                         "\uF016"
                }
                className={classNames.Icon}
            />
            {file.name}
        </td>
        <td>
            {file.createdBy.name}
        </td>
        <td>
            {new Date(file.updatedAt).toLocaleDateString()}
        </td>
    </tr>
