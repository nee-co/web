import style         from "neeco/views/NewEventView/style"
import MainContainer from "neeco/views/common/MainContainer"
import React         from "react"

var TimeSelect = (props) =>
    <select {...props}>
      {
          Array.from(Array(24).keys())
              .map(x => ("0" + x).slice(-2))
              .map(x => [
                <option key={x}      value={x + ":00:00"}>{x + ":00"}</option>,
                <option key={x + 24} value={x + ":30:00"}>{x + ":30"}</option>
              ])
              .reduce((x, y) => x.concat(y))
      }
    </select>

export default (props) =>
    <MainContainer {...props}>
      <section className={style.NewEventView}>
        <h2>イベント新規作成</h2>
        <form
          onSubmit={(e) => {
              e.preventDefault()

              var form = e.target
              // API 呼び出し
          }}
        >
          <label>
            <div>タイトル</div>
            <input name="title" type="text" required placeholder="例) Rubyもくもく会#1"/>
          </label>
          <label>
            <div>イベント画像</div>
            <input name="image" type="file"/>
          </label>
          <label>
            <div>タグ</div>
            <input name="tags" type="text" placeholder="例) Ruby, Ruby on Rails"/>
          </label>
          <label>
            <div>開催日時</div>
            <span>
              <div>
                <input name="date_from" type="date"/>
                <TimeSelect name="time_from" />
                から
              </div>
              <input name="date_to" type="date"/>
              <TimeSelect name="time_to" />
              まで
            </span>
          </label>
          <label>
            <div>場所</div>
            <input name="place" type="text" placeholder="例) 研B-501"/></label>
          <label>
            <div>イベント内容</div>
            <textarea name="description" placeholder="例) Ruby初心者歓迎!!" rows="8" />
          </label>
          <button type="submit">作成</button>
        </form>
      </section>
    </MainContainer>
