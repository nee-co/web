import style from "neeco/views/SignInView/style"
import React from "react"

export default ({
    onSubmit
}) =>
    <div className={style.SignInView}>
      <form
        onSubmit={(e) => {
            e.preventDefault()

            onSubmit(e.target.id.value, e.target.password.value)
        }}
      >
        <label>
          学籍番号
          <input name="id" type="text" />
        </label>
        <label>
          パスワード
          <input name="password" type="password" />
        </label>
        <button className={style.button}>
          送信
        </button>
      </form>
    </div>
