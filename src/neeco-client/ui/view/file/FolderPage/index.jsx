let getFolders   = require("neeco-client/api/file/getFolders")
let apply        = require("neeco-client/apply")
let config       = require("neeco-client/config")
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
            error              : null,
            files              : [],
            newButtonIsSelected: false,
            selectedIDs        : [],
            compareFunction    : (x, y) => compare(x.name, y.name),
            lastClickTime      : 0
        })
    }

    componentDidMount() {
        let {
            onError,
            store
        } = this.props

        ;(async () => {
            try {
                let files = await getFolders({
                    apiHost: config["neeco_api_host"],
                    token  : apply(store, "token")
                })

                this.setState({
                    files: files.sort(this.state.compareFunction)
                })
            } catch (e) {
                onError(e)
            }
        })()
    }

    render() {
        let {
            router,
            store
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
                <Shadow>
                </Shadow>
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
