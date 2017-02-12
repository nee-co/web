let createFile       = require("neeco-client/api/file/createFile")
let createFolder     = require("neeco-client/api/file/createFolder")
let deleteFile       = require("neeco-client/api/file/deleteFile")
let deleteFolder     = require("neeco-client/api/file/deleteFolder")
let getFolderByID    = require("neeco-client/api/file/getFolderByID")
let apply            = require("neeco-client/apply")
let config           = require("neeco-client/config")
let MaterialIcon     = require("neeco-client/ui/view/MaterialIcon")
let FileList         = require("neeco-client/ui/view/file/FileList")
let FileListItem     = require("neeco-client/ui/view/file/FileListItem")
let NewFolderDialog  = require("neeco-client/ui/view/file/NewFolderDialog")
let React            = require("react")
let Shadow           = require("react-material/ui/effect/Shadow")
let BreadcrumbList   = require("react-material/ui/view/BreadcrumbList")
let Button           = require("react-material/ui/view/Button")
let FlexibleSpace    = require("react-material/ui/view/FlexibleSpace")
let IconToggle       = require("react-material/ui/view/IconToggle")
let List             = require("react-material/ui/view/List")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")
let Menu             = require("react-material/ui/view/Menu")

let classNames = require("neeco-client/ui/view/file/FolderDetailPage/classNames")

let compare = (x, y) =>
    x < y ? -1
  : x > y ? 1
  :         0

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            compareFunction         : (x, y) => compare(x.name, y.name),
            error                   : null,
            folder                  : null,
            newFileMenuIsVisible    : false,
            newFolderDialogIsVisible: false,
            selectedIDs             : [],
            sortColumnNumber        : 0,
            loadingFile             : undefined,
            lastClickTime           : 0
        })
    }

    componentDidMount() {
        let {
            onError,
            params,
            store
        } = this.props

        ;(async () => {
            try {
                let folder = await getFolderByID({
                    apiHost: config["neeco_api_host"],
                    token  : apply(store, "token"),
                    id     : params["folder_id"]
                })
                folder.children.sort(this.state.compareFunction)

                this.setState({
                    folder: folder
                })
            } catch (e) {
                onError(e)
            }
        })()
    }

    render() {
        let {
            onError,
            router,
            store
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
                    <div
                        className={classNames.Buttons}
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
                                            try {
                                                let f = await createFile({
                                                    token  : apply(store, "token"),
                                                    apiHost: config["neeco_api_host"],
                                                    file   : e.target.files,
                                                    parent : this.state.folder.id
                                                })

                                                this.state.folder.children.push(f)
                                                this.state.folder.children.sort(this.state.compareFunction)

                                                this.setState({
                                                    newFileMenuIsVisible: false
                                                })
                                            } catch (e) {
                                                onError(e)
                                            }
                                        }
                                        input.click()
                                    }}
                                >
                                    <ListItemTextArea>
                                        ファイルをアップロード
                                    </ListItemTextArea>
                                </ListItem>
                                <ListItem>
                                    <ListItemTextArea>
                                        フォルダをアップロード
                                    </ListItemTextArea>
                                </ListItem>
                            </Menu>
                        </div>
                        <FlexibleSpace />
                        {this.state.selectedIDs.length > 0 && (
                            <IconToggle
                                children={"delete"}
                                component={MaterialIcon}
                                onClick={async e => {
                                    try {
                                        for (let id of this.state.selectedIDs)
                                        for (let x  of [this.state.folder.children.find(x => x.id == id)])
                                        if  (x.kind == "file")
                                            await deleteFile({
                                                token  : apply(store, "token"),
                                                apiHost: config["neeco_api_host"],
                                                file   : x
                                            })
                                        else
                                            await deleteFolder({
                                                token  : apply(store, "token"),
                                                apiHost: config["neeco_api_host"],
                                                folder : x
                                            })

                                        this.state.folder.children = this.state.folder.children.filter(
                                            x => !this.state.selectedIDs.includes(x.id)
                                        )

                                        this.setState({
                                            selectedIDs: []
                                        })
                                    } catch (e) {
                                        onError(e)
                                    }
                                }}
                            />
                        )}
                    </div>
                </Shadow>
                <div>
                    {this.state.folder && (
                        <FileList>
                            {this.state.folder.children.map(x =>
                                <FileListItem
                                    key={x.id}
                                    file={x}
                                    onClick={e => {
                                        if (Date.now() - this.state.lastClickTime < 500) {
                                            if (x.kind == "folder") {
                                                router.push("/folders/" + x.id)
                                            } else if (x.kind == "file" && !this.state.loadingFile) {
                                                let request = new XMLHttpRequest()
                                                request.open(
                                                    "GET",
                                                    config["neeco_api_host"] + "/files/" + x.id
                                                )
                                                request.responseType = "blob"
                                                request.setRequestHeader(
                                                    "Authorization",
                                                    "Bearer " + apply(store, "token")
                                                )
                                                request.onprogress = e => {
                                                    this.setState({
                                                        loading: {
                                                            file  : x,
                                                            loaded: e.loaded,
                                                            size  : e.size
                                                        }
                                                    })
                                                }
                                                request.onabort = e => {
                                                    console.log(e)
                                                }
                                                request.onload = e => {
                                                    let a = document.createElement("a")
                                                    a.href = URL.createObjectURL(e.target.response)
                                                    a.target = "_blank";
                                                    a.download = x.name;
                                                    a.click()

                                                    this.setState({
                                                        loading: undefined
                                                    })
                                                }
                                                request.send()
                                            }
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
                    onCancel={() => {
                        this.setState({
                            newFolderDialogIsVisible: false
                        })
                    }}
                    onDone={async ({name}) => {
                        try {
                            let f = await createFolder({
                                token  : apply(store, "token"),
                                apiHost: config["neeco_api_host"],
                                folder : {
                                    name: name
                                },
                                parent : this.state.folder
                            })

                            this.state.folder.children.push(f)
                            this.state.folder.children.sort(this.state.compareFunction)

                            this.setState({
                                newFolderDialogIsVisible: false
                            })
                        } catch (e) {
                            onError(e)
                        }
                    }}
                    visible={this.state.newFolderDialogIsVisible}
                />
            </section>
        )
    }
}
