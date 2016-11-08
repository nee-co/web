import style from "neeco/views/SignInView/style"
import React from "react"

export default ({
    onSubmit
}) =>
    <div className={style.SignInView}>
      <h1>サインイン</h1>
      <form
        onSubmit={(e) => {
            e.preventDefault()

            var form = e.target

            onSubmit({
                id            : form.id.value,
                password      : form.password.value,
                stay_signed_in: form.stay_signed_in.checked
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
          <input name="stay_signed_in" type="checkbox" value="dummy" />
          Stay signed in
        </label>
        <button className={style.button}>
          送信
        </button>
      </form>
    </div>
