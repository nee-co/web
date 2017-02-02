let getFolders   = require("neeco-client/api/file/getFolders")
let config       = require("neeco-client/config")
let FileList     = require("neeco-client/ui/view/file/FileList")
let FileListItem = require("neeco-client/ui/view/file/FileListItem")
let React        = require("react")
let Shadow       = require("react-material/ui/effect/Shadow")
let Button       = require("react-material/ui/view/Button")
let classNames   = require("neeco-client/ui/view/file/FolderPage/classNames")

let compare = (x, y) =>
    x < y ? -1
  : x > y ? 1
  :         0

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null,
            files: [],
            newButtonIsSelected: false,
            compareFunction    : (x, y) => compare(x.name, y.name),
            loading: undefined
        })
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps({
        token
    }) {
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
                    <h2>ファイル</h2>
                </Shadow>
                <div>
                    {
                        this.state.files && (
                            <FileList>
                                {this.state.files.map((f) =>
                                    <FileListItem
                                        key={f.id}
                                        file={f}
                                    />
                                )}
                           </FileList>
                        )
                    }
                </div>                
            </section>
        )
    }
}
