let FileListItem = require("neeco/ui/view/file/FileListItem")
let React        = require("react")

let classNames = require("neeco/ui/view/file/FileList/classNames")

module.exports = ({
    className,
    files,
    ...props
}) =>
    <table
        {...props}
        className={[className, classNames.FileList].join(" ")}
    >
        <thead>
            <tr>
                <th>名前</th>
                <th>オーナー</th>
                <th>最終更新</th>
            </tr>
        </thead>
        <tbody>
            {
                files.map((f) =>
                    <FileListItem
                        key={f.id}
                        file={f}
                    />
                )
            }
        </tbody>
    </table>
