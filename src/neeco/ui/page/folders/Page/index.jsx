var getFolders = require("neeco/api/file/getFolders")
var Shadow     = require("neeco/ui/effect/Shadow")
var Button     = require("neeco/ui/view/Button")
var FileList   = require("neeco/ui/view/FileList")
var Link       = require("neeco/ui/view/Link")
var List       = require("neeco/ui/view/List")
var ListItem   = require("neeco/ui/view/ListItem")
var classNames = require("neeco/ui/page/folders/Page/classNames")
var React      = require("react")

var compare = (x, y) =>
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
            var files = await getFolders({
                apiHost: process.env.NEECO_API_HOST,
                token  : token
            })

            this.setState({
                files: files.sort(this.state.compareFunction)
            })
        })()
    }

    render() {
        var {
            token,
            user
        } = this.props

        return (
            <section
                className={classNames.FilePage}
            >
                <Shadow>
                    <header>
                        <h2>ファイル</h2>
                    </header>
                </Shadow>
                {
                    this.state.files.length > 0 ? <FileList files={this.state.files} />
                  :                               <div>このフォルダは空です</div>
                }
            </section>
        )
    }
}

var ListItemA = ({
    className,
    ...props
}) =>
    <ListItem>
        <Link
            {...props}
            className={[className, classNames.PopupListItemA].join(" ")}
        />
    </ListItem>
