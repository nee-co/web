import style         from "neeco/views/FilesView/style"
import MainContainer from "neeco/views/common/MainContainer"
import React         from "react"

export default (props) =>
    <MainContainer {...props}>
      <section className={style.FilesView}>
        <h2>ファイル一覧</h2>
      </section>
    </MainContainer>
