import style         from "neeco/views/TopView/style"
import MainContainer from "neeco/views/common/MainContainer"
import React         from "react"

export default (props) =>
    <MainContainer {...props}>
      <section className={style.TopView}>
        <h2>Dashboard</h2>
      </section>
    </MainContainer>
