var getFolderByID = require("neeco/api/file/getFolderByID")
var classNames    = require("neeco/ui/page/FolderPage/classNames")
var Button        = require("neeco/ui/view/Button")
var Card          = require("neeco/ui/view/Card")
var FileList      = require("neeco/ui/view/FileList")
var Link          = require("neeco/ui/view/Link")
var List          = require("neeco/ui/view/List")
var ListItem      = require("neeco/ui/view/ListItem")
var MainLayout    = require("neeco/ui/view/MainLayout")
var React         = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error : null,
            folder: null,
            newButtonIsSelected: false
        })
    }

    componentDidMount() {
        var {
            params,
            token,
        } = this.props

        ;(async () => {
            var folder = await getFolderByID({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                id     : params.folder_id
            })

            this.setState({
                folder: folder
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
                    className={classNames.FolderPage}
                >
                    <Card>
                        <header>
                            <h2>ファイル</h2>
                            <Button
                                onClick={() => this.setState({
                                    newButtonIsSelected: !this.state.newButtonIsSelected
                                })}
                            >
                                新規
                            </Button>
                            <div
                                className={classNames.PopupBackground}
                                onClick={() => this.setState({
                                    newButtonIsSelected: false
                                })}
                                style={{
                                    display: this.state.newButtonIsSelected ? "block" : "none"
                                }}
                            />
                            <List
                                style={{
                                    display: this.state.newButtonIsSelected ? "block" : "none"
                                }}
                            >
                                <ListItemA>
                                    フォルダ
                                </ListItemA>
                                <ListItemA>
                                    <form>
                                        <label>
                                            ファイルのアップロード
                                            <input
                                                style={{display: "none"}}
                                                name="file"
                                                type="file"
                                            />
                                        </label>
                                    </form>
                                </ListItemA>
                            </List>
                            <nav>
                            </nav>
                        </header>
                    </Card>
                    {
                        this.state.folder ? <FileList
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
    <ListItem>
        <Link
            {... props}
            className={props.className + " " + classNames.PopupListItemA}
        />
    </ListItem>
