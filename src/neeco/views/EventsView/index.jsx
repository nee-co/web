import style         from "neeco/views/EventsView/style"
import MainContainer from "neeco/views/common/MainContainer"
import React         from "react"

export default (props) =>
    <MainContainer {...props}>
      <section className={style.EventsView}>
        <h2>イベント一覧</h2>
      </section>
    </MainContainer>
