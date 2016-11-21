import classNames    from "neeco/views/pages/EventsView/classNames"
import MainContainer from "neeco/views/parts/MainContainer"
import React         from "react"

export default (props) =>
    <MainContainer {...props}>
      <section className={classNames.EventView}>
        <h2>イベント詳細</h2>
      </section>
    </MainContainer>
