let getFolders       = require("neeco-client/api/file/getFolders")
let config           = require("neeco-client/config")
let FileList         = require("neeco-client/ui/view/file/FileList")
let FileListItem     = require("neeco-client/ui/view/file/FileListItem")
let React            = require("react")
let Shadow           = require("react-material/ui/effect/Shadow")
let Button           = require("react-material/ui/view/Button")
let {browserHistory} = require("react-router")

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
            compareFunction    : (x, y) => compare(x.name, y.name)
        })
    }

    componentDidMount() {
        let {
            token
        } = this.props

        ;(async () => {
            let files = await getFolders({
                apiHost: config["neeco_api_host"],
                token  : token
            })

            this.setState({
                files: files.sort(this.state.compareFunction)
            })
        })()
    }

    render() {
        let {
            token,
            user
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
                            {this.state.files.map((x) => 
                                <FileListItem
                                    key={x.id}
                                    file={x}
                                    onClick={(e) => {
                                        this.setState({
                                            selectedIDs: (
                                                this.state.selectedIDs.includes(x.id) ? this.state.selectedIDs.filter(id => id != x.id)
                                              :                                         this.state.selectedIDs.concat(x.id)
                                            )
                                        })
                                    }}
                                    onDoubleClick={(e) => {
                                        browserHistory.push("/folders/" + x.id)
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
