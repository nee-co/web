let getFolders = require("neeco/api/file/getFolders")
let FileList   = require("neeco/ui/view/file/FileList")
let React      = require("react")
let Shadow     = require("react-material/ui/effect/Shadow")
let Button     = require("react-material/ui/view/Button")
let List       = require("react-material/ui/view/List")
let ListItem   = require("react-material/ui/view/ListItem")

let classNames = require("neeco/ui/page/folders/Page/classNames")

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
            compareFunction    : (x, y) => compare(x.name, y.name)
        })
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps({
        token
    }) {
        (async () => {
            let files = await getFolders({
                apiHost: process.env.NEECO_API_HOST,
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
                className={classNames.FolderPage}
            >
                <Shadow>
                    <h2>ファイル</h2>
                </Shadow>
                <div>
                    {
                        this.state.files.length > 0 ? <FileList files={this.state.files} />
                      :                               <div>このフォルダは空です</div>
                    }
                </div>                
            </section>
        )
    }
}
