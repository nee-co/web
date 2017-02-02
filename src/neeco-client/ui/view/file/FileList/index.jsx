let React = require("react")

let classNames = require("neeco-client/ui/view/file/FileList/classNames")

module.exports = ({
    children,
    className,
    ...props
}) =>
    <table
        {...props}
        className={[className, classNames.Host].join(" ")}
    >
        <thead>
            <tr>
                <th>名前</th>
                <th>オーナー</th>
                <th>最終更新</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
