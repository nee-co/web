let React        = require("react")
let MaterialIcon = require("react-material/ui/view/MaterialIcon")

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
            <MaterialIcon
                children={
                    file.kind == "folder"                          ? "folder"
                  : /\.pdf$/.test(file.name)                       ? "picture_as_pdf"
                  : /\.(?:bmp|gif|jpg|jpeg|png)$/m.test(file.name) ? "photo"
                  :                                                  "insert_drive_file"
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
