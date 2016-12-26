var createFile    = require("neeco/api/file/createFile")
var createFolder  = require("neeco/api/file/createFolder")
var getFolderByID = require("neeco/api/file/getFolderByID")
var Shadow        = require("neeco/ui/effect/Shadow")
var classNames    = require("neeco/ui/page/folder_detail/Page/classNames")
var Button        = require("neeco/ui/view/Button")
var Dialog        = require("neeco/ui/view/Dialog")
var FileList      = require("neeco/ui/view/FileList")
var Link          = require("neeco/ui/view/Link")
var List          = require("neeco/ui/view/List")
var ListItem      = require("neeco/ui/view/ListItem")
var Popup         = require("neeco/ui/view/Popup")
var FormButton    = require("neeco/ui/view/form/Button")
var FormInput     = require("neeco/ui/view/form/Input")
var React         = require("react")

var compare = (x, y) =>
    x < y ? -1
  : x > y ? 1
  :         0

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            compareFunction            : (x, y) => compare(x.name, y.name),
            error                      : null,
            folder                     : null,
            creationMenuIsVisible      : false,
            folderCreationCardIsVisible: false,
            sortColumnNumber           : 0
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
            <section
                className={classNames.FolderPage}
            >
                <Shadow>
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
                                onClick={(e) => {
                                    e.stopPropagation()

                                    this.setState({
                                        creationMenuIsVisible: true
                                    })
                                }}
                            >
                                新規
                            </Button><br />
                            <Popup
                                className={classNames.Popup}
                                isVisible={this.state.creationMenuIsVisible}
                                onCancel={() => {
                                    this.setState({
                                        creationMenuIsVisible: false
                                    })
                                }}
                            >
                                <List>
                                    <ListItemA
                                        onClick={() => this.setState({
                                            folderCreationCardIsVisible: true
                                        })}
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

                                                        var f = await createFile({
                                                            token   : token,
                                                            apiHost : process.env.NEECO_API_HOST,
                                                            file    : formData.getAll("file"),
                                                            parentID: this.state.folder.id
                                                        })

                                                        this.state.folder.children.push(f)
                                                        this.state.folder.children.sort(this.state.compareFunction)

                                                        this.setState({
                                                            creationMenuIsVisible: false
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
                            </Popup>
                        </div>
                        <Dialog
                            className={classNames.FolderCreationCard}
                            isVisible={this.state.folderCreationCardIsVisible}
                        >
                            <h4>
                                新しいフォルダを作成
                            </h4>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault()

                                    var formData = new FormData(e.target)

                                    var f = await createFolder({
                                        token   : token,
                                        apiHost : process.env.NEECO_API_HOST,
                                        name    : formData.getAll("name"),
                                        parentID: this.state.folder.id
                                    })

                                    this.state.folder.children.push(f)
                                    this.state.folder.children.sort(this.state.compareFunction)

                                    this.setState({
                                        folderCreationCardIsVisible: false
                                    })
                                }}
                            >
                                <FormInput
                                    type="text"
                                    name="name"
                                />
                                <div>
                                    <Button
                                        onClick={() => {
                                            this.setState({
                                                folderCreationCardIsVisible: false
                                            })
                                        }}
                                    >
                                        キャンセル
                                    </Button>
                                    <FormButton>
                                        作成
                                    </FormButton>
                                </div>
                            </form>
                        </Dialog>
                    </header>
                </Shadow>
                {
                    this.state.folder
                 && this.state.folder.children.length > 0
                    ? <FileList
                        files={this.state.folder.children}
                      />
                    : <div>このフォルダは空です</div>
                }
            </section>
        )
    }
}

var ListItemA = ({
    className,
    ...props
}) =>
    <ListItem
        {...props}
         className={[className, classNames.PopupListItemA].join(" ")}
    />
