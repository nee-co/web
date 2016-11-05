import style         from "neeco/views/ProfileView/style"
import MainContainer from "neeco/views/common/MainContainer"
import React         from "react"

export default ({
    user
}) =>
    <MainContainer>
      <h2>プロフィール</h2>
      <div>ユーザー名: {user.name}</div>
      <div>学籍番号: {user.number}</div>
    </MainContainer>
