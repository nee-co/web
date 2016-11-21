import classNames    from "neeco/views/pages/TopView/classNames"
import MainContainer from "neeco/views/parts/MainContainer"
import React         from "react"

export default (props) =>
    <MainContainer {...props}>
      <section className={classNames.TopView}>
        <h2>ダッシュボード</h2>
      </section>
    </MainContainer>
