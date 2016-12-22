var getFolders = require("neeco/api/file/getFolders")
var classNames = require("neeco/ui/page/folders/Page/classNames")
var Button     = require("neeco/ui/view/Button")
var Card       = require("neeco/ui/view/Card")
var FileList   = require("neeco/ui/view/FileList")
var Link       = require("neeco/ui/view/Link")
var List       = require("neeco/ui/view/List")
var ListItem   = require("neeco/ui/view/ListItem")
var MainLayout = require("neeco/ui/view/MainLayout")
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
            compareFunction: (x, y) => compare(x.name, y.name)
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
            <MainLayout
                {... this.props}
            >
                <section
                    className={classNames.FilePage}
                >
                    <Card>
                        <header>
                            <h2>ファイル</h2>
                        </header>
                    </Card>
                    {
                        this.state.files.length > 0 ? <FileList files={this.state.files} />
                                                    : <div>このフォルダは空です</div>
                    }
                </section>
            </MainLayout>
        )
    }
}

var ListItemA = (props) =>
    <ListItem>
        <Link
            {... props}
            className={props.className + " " + classNames.PopupListItemA}
        />
    </ListItem>
