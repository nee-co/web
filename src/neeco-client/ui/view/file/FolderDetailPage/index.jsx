let CreateFile       = require("neeco-client/api/request/CreateFile")
let CreateFolder     = require("neeco-client/api/request/CreateFolder")
let DeleteFile       = require("neeco-client/api/request/DeleteFile")
let DeleteFolder     = require("neeco-client/api/request/DeleteFolder")
let GetFileById      = require("neeco-client/api/request/GetFileById")
let GetFolderById    = require("neeco-client/api/request/GetFolderById")
let UpdateFile       = require("neeco-client/api/request/UpdateFile")
let UpdateFolder     = require("neeco-client/api/request/UpdateFolder")
let FileList         = require("neeco-client/ui/view/file/FileList")
let FileListItem     = require("neeco-client/ui/view/file/FileListItem")
let NewFolderDialog  = require("neeco-client/ui/view/file/NewFolderDialog")
let RenameDialog     = require("neeco-client/ui/view/file/RenameDialog")
let React            = require("react")
let Shadow           = require("react-material/ui/effect/Shadow")
let BreadcrumbList   = require("react-material/ui/view/BreadcrumbList")
let Button           = require("react-material/ui/view/Button")
let FlexibleSpace    = require("react-material/ui/view/FlexibleSpace")
let IconToggle       = require("react-material/ui/view/IconToggle")
let LinearLayout     = require("react-material/ui/view/LinearLayout")
let List             = require("react-material/ui/view/List")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")
let MaterialIcon     = require("react-material/ui/view/MaterialIcon")
let Menu             = require("react-material/ui/view/Menu")

let classNames = require("neeco-client/ui/view/file/FolderDetailPage/classNames")

let compare = (x, y) =>
    x < y ? -1
  : x > y ? 1
  :         0

let download = async (client, x) => {
    let f = await client(GetFileById({
        file: x
    }))

    let a = document.createElement("a")
    a.href = f.downloadUrl
    a.download = x.name
    a.click()
}

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            compareFunction         : (x, y) => compare(x.name, y.name),
            folder                  : undefined,
            newFileMenuIsVisible    : false,
            newFolderDialogIsVisible: false,
            renameDialogIsVisible   : false,
            selectedIDs             : [],
            sortColumnNumber        : 0,
            lastClickTime           : 0
        })
    }

    componentDidMount() {
        (async () => {
            let {getClient} = this.props
    
            let client = await getClient()

            let {params} = this.props

            this.setState({
                folder: await client(GetFolderById({
                    id: params["folder_id"]
                }))
            })
        })()
    }

    componentWillReceiveProps({
        getClient,
        params
    }) {
        if (params["folder_id"] != this.props.params["folder_id"]) {
            (async () => {
                let client = await getClient()

                this.setState({
                    folder: await client(GetFolderById({
                        id: params["folder_id"]
                    }))
                })
            })()
        }
    }

    render() {
        let {
            client,
            router
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
                <Shadow>
                    <nav>
                        <BreadcrumbList
                            className={classNames.Parents}
                        >
                            <ListItem
                                to="/folders"
                            >
                                /
                            </ListItem>
                            {this.state.folder && this.state.folder.parents.map(x =>
                                <ListItem
                                    key={x.id}
                                    to={"/folders/" + x.id}
                                >
                                    {x.name}
                                </ListItem>
                            )}
                            <ListItem>
                                {this.state.folder && this.state.folder.name}
                            </ListItem>
                        </BreadcrumbList>
                    </nav>
                    <LinearLayout
                        className={classNames.Buttons}
                        orientation="horizontal"
                    >
                        <div>
                            <Button
                                type="flat"
                                onClick={e => {
                                    this.setState({
                                        newFileMenuIsVisible: true
                                    })
                                }}
                            >
                                新規
                            </Button>
                            <Menu
                                visible={this.state.newFileMenuIsVisible}
                                onCancel={() => {
                                    this.setState({
                                        newFileMenuIsVisible: false
                                    })
                                }}
                            >
                                <ListItem
                                    onClick={e => {
                                        this.setState({
                                            newFileMenuIsVisible    : false,
                                            newFolderDialogIsVisible: true
                                        })
                                    }}
                                >
                                    <ListItemTextArea>
                                        フォルダ
                                    </ListItemTextArea>
                                </ListItem>
                                <ListItem
                                    onClick={e => {
                                        let input = document.createElement("input")
                                        input.setAttribute("type", "file")
                                        input.onchange = async e => {
                                            this.state.folder.children.push(
                                                await client(CreateFile({
                                                    file  : e.target.files,
                                                    parent: this.state.folder
                                                }))
                                            )

                                            this.setState({
                                                newFileMenuIsVisible: false
                                            })
                                        }
                                        input.click()
                                    }}
                                >
                                    <ListItemTextArea>
                                        ファイルをアップロード
                                    </ListItemTextArea>
                                </ListItem>
                            </Menu>
                        </div>
                        <FlexibleSpace />
                        <IconToggle
                            children={"file_download"}
                            component={MaterialIcon}
                            disabled={
                                this.state.selectedIDs.length != 1
                             || !this.state.folder
                             || (
                                    this.state.folder.children
                                        .find(x => x.id == this.state.selectedIDs[0])
                                 || {}
                                )
                                    .kind != "file"
                            }
                            onClick={async e => {
                                if (this.state.selectedIDs.length != 1)
                                    return
                                
                                let x = this.state.folder.children.find(x => x.id == this.state.selectedIDs[0])

                                await download(client, x)

                                this.setState({
                                    selectedIDs: []
                                })
                            }}
                            title="ダウンロード"
                        />
                        <IconToggle
                            children={"edit"}
                            component={MaterialIcon}
                            disabled={this.state.selectedIDs.length != 1}
                            onClick={async e => {
                                if (this.state.selectedIDs.length != 1)
                                    return

                                this.setState({
                                    renameDialogIsVisible: true
                                })
                            }}
                            title="名前の変更"
                        />
                        <IconToggle
                            children={"delete"}
                            component={MaterialIcon}
                            disabled={this.state.selectedIDs.length == 0}
                            onClick={async e => {
                                if (this.state.selectedIDs.length == 0)
                                    return

                                for (let id of this.state.selectedIDs)
                                for (let x  of [this.state.folder.children.find(x => x.id == id)])
                                if  (x.kind == "file")
                                    await client(DeleteFile({
                                        file: x
                                    }))
                                else
                                    await client(DeleteFolder({
                                        folder: x
                                    }))
                                
                                this.state.folder.children = this.state.folder.children.filter(
                                    x => !this.state.selectedIDs.includes(x.id)
                                )
                                
                                this.setState({
                                    selectedIDs: []
                                })
                            }}
                            title="削除"
                        />
                    </LinearLayout>
                </Shadow>
                <div>
                    {this.state.folder && (
                        <FileList>
                            {this.state.folder.children.sort(this.state.compareFunction).map(x =>
                                <FileListItem
                                    key={x.id}
                                    file={x}
                                    onClick={async e => {
                                        if (Date.now() - this.state.lastClickTime < 500) {
                                            if (x.kind == "folder")
                                                router.push("/folders/" + x.id)
                                            else if (x.kind == "file")
                                                await download(client, x)
                                        }

                                        this.setState({
                                            lastClickTime: Date.now(),
                                            selectedIDs  : [x.id]
                                        })
                                    }}
                                    selected={this.state.selectedIDs.includes(x.id)}
                                />
                            )}
                        </FileList>
                    )}
                </div>
                <NewFolderDialog
                    parent={this.state.folder}
                    onCancel={() => {
                        this.setState({
                            newFolderDialogIsVisible: false
                        })
                    }}
                    onDone={async ({name}) => {
                        let f = await client(CreateFolder({
                            folder: {
                                name: name
                            },
                            parent: this.state.folder
                        }))

                        this.state.folder.children.push(f)
                        this.state.folder.children.sort(this.state.compareFunction)

                        this.setState({
                            newFolderDialogIsVisible: false
                        })
                    }}
                    visible={this.state.newFolderDialogIsVisible}
                />
                <RenameDialog
                    file={
                        this.state.renameDialogIsVisible
                     && this.state.folder.children.find(x => x.id == this.state.selectedIDs[0])
                    }
                    parent={this.state.folder}
                    onCancel={() => {
                        this.setState({
                            renameDialogIsVisible: false
                        })
                    }}
                    onDone={async ({name}) => {
                        let x = this.state.folder.children.find(x => x.id == this.state.selectedIDs[0])

                        if  (x.kind == "file")
                            await client(UpdateFile({
                                file: {
                                    id  : x.id,
                                    name: name
                                }
                            }))
                        else
                            await client(UpdateFolder({
                                folder: {
                                    id  : x.id,
                                    name: name
                                }
                            }))

                        x.name = name

                        this.setState({
                            renameDialogIsVisible: false,
                            selectedIDs          : []
                        })
                    }}
                    visible={this.state.renameDialogIsVisible}
                />
            </section>
        )
    }
}
