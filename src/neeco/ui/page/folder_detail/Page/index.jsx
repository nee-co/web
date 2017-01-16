let createFile    = require("neeco/api/file/createFile")
let createFolder  = require("neeco/api/file/createFolder")
let getFolderByID = require("neeco/api/file/getFolderByID")
let Dialog        = require("neeco/ui/control/Dialog")
let DialogBody    = require("neeco/ui/control/DialogBody")
let DialogFooter  = require("neeco/ui/control/DialogFooter")
let DialogHeader  = require("neeco/ui/control/DialogHeader")
let Shadow        = require("neeco/ui/effect/Shadow")
let classNames    = require("neeco/ui/page/folder_detail/Page/classNames")
let Button        = require("neeco/ui/view/Button")
let FileList      = require("neeco/ui/view/FileList")
let LinkButton    = require("neeco/ui/view/LinkButton")
let List          = require("neeco/ui/view/List")
let ListItem      = require("neeco/ui/view/ListItem")
let Popup         = require("neeco/ui/view/Popup")
let FormButton    = require("neeco/ui/view/form/Button")
let TextField     = require("neeco/ui/view/form/TextField")
let React         = require("react")

let compare = (x, y) =>
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
        let {
            token,
            params
        } = this.props

        ;(async () => {
            let folder = await getFolderByID({
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
            let folder = await getFolderByID({
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
        let {
            token
        } = this.props

        return (
            <section
                className={classNames.FolderPage}
            >
                <Shadow>
                    <h2>
                        <nav>
                            <List
                                className={classNames.Breadcrumbs}
                            >
                                <ListItem>
                                    <LinkButton
                                        to="/folders"
                                    >
                                        /
                                    </LinkButton>
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
                                this.setState({
                                    creationMenuIsVisible: true
                                })
                            }}
                            type="raised"
                        >
                            新規
                        </Button><br />
                        <Popup
                            className={classNames.Popup}
                            visible={this.state.creationMenuIsVisible}
                            onCancel={() => {
                                this.setState({
                                    creationMenuIsVisible: false
                                })
                            }}
                        >
                            <List>
                                <ListItemA
                                    onClick={() => {
                                        this.setState({
                                            creationMenuIsVisible: false,
                                            folderCreationCardIsVisible: true
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
                                                    let formData = new FormData(e.target.form)

                                                    let f = await createFile({
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
                </Shadow>
                <div>
                    {
                        this.state.folder
                     && this.state.folder.children.length > 0
                        ? <FileList
                            files={this.state.folder.children}
                        />
                        : <div>このフォルダは空です</div>
                    }
                </div>
                <Dialog
                    className={classNames.FolderCreationCard}
                    visible={this.state.folderCreationCardIsVisible}
                    onCancel={() => {
                        this.setState({
                            folderCreationCardIsVisible: false
                        })
                    }}
                >
                    <DialogHeader>
                        <h4>
                            新しいフォルダを作成
                        </h4>
                    </DialogHeader>
                    <DialogBody>
                        <form
                            id="new_folder_form"
                            onSubmit={async (e) => {
                                e.preventDefault()

                                let formData = new FormData(e.target)

                                let f = await createFolder({
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
                            <TextField
                                labelText={"フォルダ名"}
                                name="name"
                                required
                            />
                        </form>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                this.setState({
                                    folderCreationCardIsVisible: false
                                })
                            }}
                        >
                            キャンセル
                        </Button>
                        <FormButton
                            form="new_folder_form"
                        >
                            作成
                        </FormButton>
                    </DialogFooter>
                </Dialog>
            </section>
        )
    }
}

let ListItemA = ({
    className,
    ...props
}) =>
    <ListItem
        {...props}
        className={[className, classNames.PopupListItemA].join(" ")}
    />
