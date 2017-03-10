let ListFolders   = require("neeco-client/api/request/ListFolders")
let FileList     = require("neeco-client/ui/view/file/FileList")
let FileListItem = require("neeco-client/ui/view/file/FileListItem")
let React        = require("react")
let Shadow       = require("react-material/ui/effect/Shadow")
let Button       = require("react-material/ui/view/Button")

let classNames = require("neeco-client/ui/view/file/FolderPage/classNames")

let compare = (x, y) =>
    x < y ? -1
  : x > y ? 1
  :         0

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            files              : [],
            newButtonIsSelected: false,
            selectedIDs        : [],
            compareFunction    : (x, y) => compare(x.name, y.name),
            lastClickTime      : 0
        })
    }

    componentDidMount() {
        let {withClient} = this.props

        withClient(async client => {
            let files = await client(ListFolders({}))

            this.setState({
                files: files.sort(this.state.compareFunction)
            })
        })
    }

    render() {
        let {router} = this.props

        return (
            <section
                className={classNames.Host}
            >
                <Shadow
                />
                <div>
                    {this.state.files.length > 0 && (
                        <FileList>
                            {this.state.files.map(x =>
                                <FileListItem
                                    key={x.id}
                                    file={x}
                                    onClick={e => {
                                        if (Date.now() - this.state.lastClickTime < 500) {
                                            router.push("/folders/" + x.id)
                                        }

                                        this.setState({
                                            selectedIDs  : [x.id],
                                            lastClickTime: Date.now()
                                        })
                                    }}
                                    selected={this.state.selectedIDs.includes(x.id)}
                                />
                            )}
                        </FileList>
                    )}
                    {this.state.files.length == 0 && <div>このフォルダは空です</div>}
                </div>
            </section>
        )
    }
}
