import getFolders    from "neeco/api/file/getFolders"
import classNames    from "neeco/views/pages/FilesView/classNames"
import LinkButton    from "neeco/views/parts/LinkButton"
import MainContainer from "neeco/views/parts/MainContainer"
import MenuItem      from "neeco/views/parts/MenuItem"
import PopupMenu     from "neeco/views/parts/PopupMenu"
import React         from "react"
import {Link}        from "react-router"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null,
            files: [],
            newButtonIsSelected: false
        })
    }

    componentDidMount() {
        getFolders({token: this.props.token})
            .then((files) => this.setState({files: files}))
            .catch((e) => {
            })
    }

    render() {
        var {
            token,
            user
        } = this.props

        return (
            <MainContainer {... this.props}>
              <section className={classNames.FilesView}>
                <div>
                  <h2>ファイル</h2>
                  <LinkButton onClick={() => this.setState({
                      newButtonIsSelected: !this.state.newButtonIsSelected
                  })}>
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
                  <PopupMenu
                    style={{
                        display: this.state.newButtonIsSelected ? "block" : "none"
                    }}
                  >
                    <PopupMenuItemA>
                      フォルダ
                    </PopupMenuItemA>
                    <PopupMenuItemA>
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
                    </PopupMenuItemA>
                  </PopupMenu>
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

var PopupMenuItemA = (props) =>
    <MenuItem>
      <Link {... props}
        className={props.className + " " + classNames.PopupMenuItemA}
      />
    </MenuItem>

var FileListView = ({files}) =>
    <table>
      <thead>
        <tr>
          <th>名前</th>
          <th>管理者</th>
        </tr>
      </thead>
      <tbody>
        {
            files.map(({id, name}) =>
                <tr key={id}>
                    <th>{name}</th>
                    <th>A</th>
                </tr>
            )
        }
      </tbody>
    </table>
