let getConfiguration = require("neeco-client/api/getConfiguration")
let CreateFile       = require("neeco-client/api/request/CreateFile")
let CreateFolder     = require("neeco-client/api/request/CreateFolder")
let DeleteFile       = require("neeco-client/api/request/DeleteFile")
let DeleteFolder     = require("neeco-client/api/request/DeleteFolder")
let GetFolderByID    = require("neeco-client/api/request/GetFolderByID")
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
let MaterialIcon     = require("react-material/ui/view/MaterialIcon")
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
            folder                  : undefined,
            newFileMenuIsVisible    : false,
            newFolderDialogIsVisible: false,
            selectedIDs             : [],
            sortColumnNumber        : 0,
            lastClickTime           : 0
        })
    }

    componentDidMount() {
        let {
            params,
            client
        } = this.props

        ;(async () => {
            this.setState({
                folder: await client(GetFolderByID({
                    id: params["folder_id"]
                }))
            })
        })()
    }

    componentWillReceiveProps({
        params,
        client
    }) {
        if (params["folder_id"] != this.props.params["folder_id"]) {
            ;(async () => {
                this.setState({
                    folder: await client(GetFolderByID({
                        id: params["folder_id"]
                    }))
                })
            })()
        }
    }

    render() {
        let {
            router,
            client
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
                                            this.state.folder.children.push(
                                                await client(CreateFile({
                                                    file   : e.target.files,
                                                    parent : this.state.folder.id
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
                            />
                        )}
                    </div>
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
                                            if (x.kind == "folder") {
                                                router.push("/folders/" + x.id)
                                            } else if (x.kind == "file") {
                                                let response = await fetch(
                                                    getConfiguration().api.url + "/files/" + x.id,
                                                    {
                                                        method: "GET",
                                                        headers: {
                                                            "Authorization": "Bearer " + client.token
                                                        }
                                                    }
                                                )

                                                let data = await response.json()

                                                let a = document.createElement("a")
                                                a.href = data["download_url"]
                                                    .replace(/^(.+?\/{2}.+?)\/{2}/, "$1/")
                                                a.target = "_blank"
                                                a.download = x.name
                                                a.click()
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
                        let f = await client(CreateFolder({
                            folder : {
                                name: name
                            },
                            parent : this.state.folder
                        }))

                        this.state.folder.children.push(f)
                        this.state.folder.children.sort(this.state.compareFunction)

                        this.setState({
                            newFolderDialogIsVisible: false
                        })
                    }}
                    visible={this.state.newFolderDialogIsVisible}
                />
            </section>
        )
    }
}
