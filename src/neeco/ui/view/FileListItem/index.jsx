var FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
var classNames      = require("neeco/ui/view/FileListItem/classNames")
var React           = require("react")
var {Link}          = require("react-router")

module.exports = ({file}) =>
    <tr
        className={classNames.FileListItem}
    >
        <td>
            <FileLink
                file={file}
            >
                <FontAwesomeIcon
                    children={
                        file.kind == "file" ? "\uF016"
                      :                       "\uF114"
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

var FileLink = ({children, file}) => 
    <Link
        children={children}
        className={classNames.FileLink}
        to={"/folders/" + file.id}
    />
