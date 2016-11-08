import style from "neeco/views/SignInView/style"
import React from "react"

export default ({
    onSubmit
}) =>
    <div className={style.SignInView}>
      <h2>サインイン</h2>
      <form
        onSubmit={(e) => {
            e.preventDefault()

            var form = e.target

            onSubmit({
                id          : form.id.value,
                password    : form.password.value,
                staySignedIn: form.staySignedIn.checked
            })
        }}
      >
        <label>
          <input name="id" type="text" placeholder="学籍番号" />
        </label>
        <label>
          <input name="password" type="password" placeholder="パスワード" />
        </label>
        <label>
          <input name="staySignedIn" type="checkbox" value="dummy" />
          Stay signed in
        </label>
        <button className={style.button}>
          送信
        </button>
      </form>
    </div>
