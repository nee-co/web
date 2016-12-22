var createFile    = require("neeco/api/file/createFile")
var createFolder  = require("neeco/api/file/createFolder")
var getFolderByID = require("neeco/api/file/getFolderByID")
var classNames    = require("neeco/ui/page/folder_detail/Page/classNames")
var Button        = require("neeco/ui/view/Button")
var Card          = require("neeco/ui/view/Card")
var FileList      = require("neeco/ui/view/FileList")
var Link          = require("neeco/ui/view/Link")
var List          = require("neeco/ui/view/List")
var ListItem      = require("neeco/ui/view/ListItem")
var MainLayout    = require("neeco/ui/view/MainLayout")
var PopupCard     = require("neeco/ui/view/PopupCard")
var React         = require("react")

var compare = (x, y) =>
    x < y ? -1
  : x > y ? 1
  :         0

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error              : null,
            folder             : null,
            newButtonIsSelected: false,
            compareFunction    : (x, y) => compare(x.name, y.name),
            sortColumnNumber   : 0
        })
    }

    componentDidMount() {
        var {
            token,
            params
        } = this.props

        ;(async () => {
            var folder = await getFolderByID({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                id     : params["folder_id"]
            })
            
            folder.children.sort(this.state.compareFunction)

            this.setState({
                folder: folder
            })
        })()
    }

    componentWillReceiveProps({
        token,
        params
    }) {
        (async () => {
            var folder = await getFolderByID({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                id     : params["folder_id"]
            })

            folder.children.sort(this.state.compareFunction)

            folder.children.sort(this.state.compareFunction).forEach((o) => console.log(o.name))

            this.setState({
                folder: folder
            })
        })()
    }

    render() {
        var {
            token
        } = this.props

        return (
            <MainLayout
                {... this.props}
            >
                <section
                    className={classNames.FolderPage}
                >
                    <Card>
                        <header>
                            <h2>
                                <nav>
                                    <List
                                        className={classNames.Breadcrumbs}
                                    >
                                        <ListItem>
                                            <Link
                                                to="/file"
                                            >
                                                /
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            {
                                                this.state.folder ? this.state.folder.name
                                              :                     ""
                                            }
                                        </ListItem>
                                    </List>
                                </nav>
                            </h2>
                            <div>
                                <Button
                                    onClick={() => this.setState({
                                        newButtonIsSelected: true
                                    })}
                                >
                                    新規
                                </Button><br />
                                <PopupCard
                                    className={classNames.Popup}
                                    isVisible={this.state.newButtonIsSelected}
                                >
                                    <List>
                                        <ListItemA
                                            onClick={async () => {
                                                var folder = await createFolder({
                                                    token   : token,
                                                    apiHost : process.env.NEECO_API_HOST,
                                                    parentID: this.state.folder.id
                                                })

                                                this.state.folder.children = this.state.folder.children
                                                    .concat(folder)
                                                    .sort(this.state.compareFunction)

                                                this.setState({
                                                    newButtonIsSelected: false
                                                })
                                            }}
                                        >
                                            フォルダ
                                        </ListItemA>
                                        <ListItemA>
                                            <form>
                                                <label>
                                                    ファイルをアップロード
                                                    <input
                                                        name="file"
                                                        type="file"
                                                        style={{display: "none"}}
                                                        onChange={async (e) => {
                                                            var formData = new FormData(e.target.form)

                                                            var file = await createFile({
                                                                token   : token,
                                                                apiHost : process.env.NEECO_API_HOST,
                                                                file    : formData.getAll("file"),
                                                                parentID: this.state.folder.id
                                                            })

                                                            this.state.folder.children = this.state.folder.children
                                                                .concat(file)
                                                                .sort(this.state.compareFunction)

                                                            this.setState({
                                                                newButtonIsSelected: false
                                                            })
                                                        }}
                                                    />
                                                </label>
                                            </form>
                                        </ListItemA>
                                        <ListItemA>
                                            フォルダをアップロード
                                        </ListItemA>
                                    </List>
                                </PopupCard>
                            </div>
                        </header>
                    </Card>
                    {
                        this.state.folder
                     && this.state.folder.children.length > 0
                        ? <FileList
                            files={this.state.folder.children}
                          />
                        : <div>このフォルダは空です</div>
                    }
                </section>
            </MainLayout>
        )
    }
}

var ListItemA = (props) =>
    <ListItem
        {... props}
         className={props.className + " " + classNames.PopupListItemA}
    />
