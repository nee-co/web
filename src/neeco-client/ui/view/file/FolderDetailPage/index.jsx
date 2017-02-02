let createFile       = require("neeco-client/api/file/createFile")
let createFolder     = require("neeco-client/api/file/createFolder")
let getFolderByID    = require("neeco-client/api/file/getFolderByID")
let config           = require("neeco-client/config")
let FileList         = require("neeco-client/ui/view/file/FileList")
let FileListItem     = require("neeco-client/ui/view/file/FileListItem")
let NewFolderDialog  = require("neeco-client/ui/view/file/NewFolderDialog")
let React            = require("react")
let Shadow           = require("react-material/ui/effect/Shadow")
let BreadcrumbList   = require("react-material/ui/view/BreadcrumbList") 
let Button           = require("react-material/ui/view/Button")
let FlexibleSpace    = require("react-material/ui/view/FlexibleSpace")
let List             = require("react-material/ui/view/List")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")
let Menu             = require("react-material/ui/view/Menu")
let {browserHistory} = require("react-router")

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
            loadingFile             : undefined
        })
    }

    componentDidMount() {
        let {
            token,
            params
        } = this.props

        ;(async () => {
            let folder = await getFolderByID({
                apiHost: config["neeco_api_host"],
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
        ;(async () => {
            let folder = await getFolderByID({
                apiHost: config["neeco_api_host"],
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
                className={classNames.Host}
            >
                <Shadow>
                    <h2>
                        <nav>
                            <BreadcrumbList>
                                <ListItem
                                    to="/folders"
                                >
                                    /
                                </ListItem>
                                <ListItem>
                                    {this.state.folder && this.state.folder.name}
                                </ListItem>
                            </BreadcrumbList>
                        </nav>
                    </h2>
                    <div>
                        <div>
                            <Button
                                type="flat"
                                onClick={(e) => {
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
                                    onClick={(file) => {
                                        this.setState({
                                            newFileMenuIsVisible: false,
                                            newFolderDialogIsVisible: true
                                        })
                                    }}
                                >
                                    <ListItemTextArea>
                                        フォルダ
                                    </ListItemTextArea>
                                </ListItem>
                                <ListItem
                                    onClick={(e) => {
                                        let input = document.createElement("input")
                                        input.setAttribute("type", "file")
                                        input.onchange = async (e) => {
                                            let f = await createFile({
                                                token  : token,
                                                apiHost: config["neeco_api_host"],
                                                file   : e.target.files,
                                                parent : this.state.folder.id
                                            })

                                            this.state.folder.children.push(f)
                                            this.state.folder.children.sort(this.state.compareFunction)

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
                            <Button
                                onClick={(e) => {
                                    this.setState({
                                        selectedFile: undefined
                                    })
                                }}
                                type="flat"
                            >
                                削除
                            </Button>
                        )}
                    </div>
                </Shadow>
                <div>
                    {this.state.folder && (
                        <FileList>
                            {this.state.folder.children.map((x) =>
                                <FileListItem
                                    key={x.id}
                                    file={x}
                                    onClick={(e) => {
                                        this.setState({
                                            selectedIDs: (
                                                this.state.selectedIDs.includes(x.id) ? this.state.selectedIDs.filter(id => id != x.id)
                                               :                                        this.state.selectedIDs.concat(x.id)
                                            )
                                        })
                                    }}
                                    onDoubleClick={(e) => {
                                        if (x.kind == "folder") {
                                            browserHistory.push("/folders/" + x.id)
                                        } else if (x.kind == "file" && !this.state.loadingFile) {
                                            let request = new XMLHttpRequest()
                                            request.open(
                                                "GET",
                                                config["neeco_api_host"] + "/files/" + x.id
                                            )
                                            request.responseType = "blob"
                                            request.setRequestHeader("Authorization", "Bearer " + token)
                                            request.onprogress = (e) => {
                                                this.setState({
                                                    loading: {
                                                        file  : x,
                                                        loaded: e.loaded,
                                                        size  : e.size
                                                    }
                                                })
                                            }
                                            request.onabort = (e) => {
                                                console.log("abort", e)
                                            }
                                            request.onload = (e) => {
                                                let a = document.createElement("a")
                                                a.href = URL.createObjectURL(e.target.response)
                                                a.target = "_blank";
                                                a.download = x.name;
                                                a.click()
                                                window.a = a
                                                this.setState({
                                                    loading: undefined
                                                })
                                            }
                                            request.send()
                                        }
                                    }}
                                    selected={this.state.selectedIDs.includes(x.id)}
                                />
                            )}
                        </FileList>
                    )}
                </div>
                <NewFolderDialog
                    visible={this.state.newFolderDialogIsVisible}
                    onCreate={async (formData) => {
                        let f = await createFolder({
                            token  : token,
                            apiHost: config["neeco_api_host"],
                            folder : {
                                name: formData.getAll("name")
                            },
                            parent : this.state.folder
                        })

                        this.state.folder.children.push(f)
                        this.state.folder.children.sort(this.state.compareFunction)

                        this.setState({
                            newFolderDialogIsVisible: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            newFolderDialogIsVisible: false
                        })
                    }}
                />
            </section>
        )
    }
}
