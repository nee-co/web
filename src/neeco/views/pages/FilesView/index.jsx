import getFolders    from "neeco/api/file/getFolders"
import classNames    from "neeco/views/pages/FilesView/classNames"
import LinkButton    from "neeco/views/parts/LinkButton"
import MainContainer from "neeco/views/parts/MainContainer"
import React         from "react"
import {Link}        from "react-router"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null,
            files: []
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
                <h2>ファイル</h2>
                <LinkButton>
                  新規
                </LinkButton>
                <table>
                  <thead>
                    <tr>
                      <th>名前</th>
                      <th>管理者</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        this.state.files.map(({id, name}) =>
                            <tr key={id}>
                              <th>{name}</th>
                              <th>A</th>
                            </tr>
                        )
                    }
                  </tbody>
                </table>
              </section>
            </MainContainer>
        )
    }
}
