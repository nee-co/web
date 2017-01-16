let classNames   = require("neeco/ui/view/FileList/classNames")
let FileListItem = require("neeco/ui/view/FileListItem")
let React        = require("react")

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
