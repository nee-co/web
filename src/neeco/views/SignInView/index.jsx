import style from "neeco/views/SignInView/style"
import React from "react"

export default ({
    onSubmit
}) =>
    <div className={style.SignInView}>
      <form>
        <label>学籍番号<input type="text"/></label>
        <label>パスワード<input type="password"/></label>
        <button className={style.button} onClick={onSubmit}>
          送信
        </button>
      </form>
    </div>
