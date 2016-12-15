var getFolders    = require("neeco/api/file/getFolders")
var classNames    = require("neeco/ui/page/FilePage/classNames")
var LinkButton    = require("neeco/ui/view/LinkButton")
var MainContainer = require("neeco/ui/view/MainContainer")
var ListItem      = require("neeco/ui/view/ListItem")
var PopupList     = require("neeco/ui/view/PopupList")
var React         = require("react")
var {Link}        = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null,
            files: [],
            newButtonIsSelected: false
        })
    }

    componentDidMount() {
        var {
            token,
        } = this.props

        ;(async () => {
            var files = await getFolders({
                apiHost: process.env.NEECO_API_HOST,
                token  : token
            })
            
            this.setState({files: files})
        })()
    }

    render() {
        var {
            token,
            user
        } = this.props

        return (
            <MainContainer
                {... this.props}
            >
                <section
                    className={classNames.FilePage}
                >
                    <div>
                        <h2>ファイル</h2>
                        <LinkButton
                            onClick={() => this.setState({
                                newButtonIsSelected: !this.state.newButtonIsSelected
                            })}
                        >
                            新規
                        </LinkButton>
                        <div
                            className={classNames.PopupBackground}
                            onClick={() => this.setState({
                                newButtonIsSelected: false
                            })}
                            style={{
                                display: this.state.newButtonIsSelected ? "block" : "none"
                            }}
                        />
                        <PopupList
                            style={{
                                display: this.state.newButtonIsSelected ? "block" : "none"
                            }}
                        >
                            <PopupListItemA>
                                フォルダ
                            </PopupListItemA>
                            <PopupListItemA>
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
                            </PopupListItemA>
                        </PopupList>
                        <nav>
                        </nav>
                    </div>
                    {
                        this.state.files.length > 0 ? <FileListView files={this.state.files} />
                                                    : <div>このフォルダは空です</div>
                    }
                </section>
            </MainContainer>
        )
    }
}

var PopupListItemA = (props) =>
    <ListItem>
        <Link
            {... props}
            className={props.className + " " + classNames.PopupListItemA}
        />
    </ListItem>

var FileListView = ({files}) =>
    <table
        className={classNames.FileListView}
    >
        <thead>
            <tr>
                <th>名前</th>
                <th>管理者</th>
            </tr>
        </thead>
        <tbody>
            {
                files.map(({id, name}) =>
                    <tr
                        key={id}
                    >
                        <th>{name}</th>
                        <th>A</th>
                    </tr>
                )
            }
        </tbody>
    </table>
