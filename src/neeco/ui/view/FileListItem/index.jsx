var FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
var classNames      = require("neeco/ui/view/FileListItem/classNames")
var React           = require("react")
var {Link}          = require("react-router")

module.exports = ({
    className,
    file,
    ...props
}) =>
    <tr
        {...props}
        className={[className, classNames.FileListItem].join(" ")}
    >
        <td>
            <FileLink
                file={file}
            >
                <FontAwesomeIcon
                    children={
                        file.kind == "folder" ? "\uF114"
                      :                         "\uF016"
                    }
                    className={classNames.Icon}
                />
                {file.name}
            </FileLink>
        </td>
        <td>
            <FileLink
                file={file}
            >
                {file.createdBy.name}
            </FileLink>
        </td>
        <td>
            <FileLink
                file={file}
            >
                {new Date(file.updatedAt).toLocaleDateString()}
            </FileLink>
        </td>
    </tr>

var FileLink = ({
    children,
    file,
    ...props
}) =>
    <Link
        {...props}
        children={children}
        className={classNames.FileLink}
        to={"/folders/" + file.id}
    />
