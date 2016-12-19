var classNames   = require("neeco/ui/view/FileList/classNames")
var FileListItem = require("neeco/ui/view/FileListItem")
var React        = require("react")

module.exports = ({files}) =>
    <table
        className={classNames.FileList}
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
