import postEvent     from "neeco/api/event/postEvent"
import classNames    from "neeco/views/pages/NewEventView/classNames"
import FormButton    from "neeco/views/parts/FormButton"
import MainContainer from "neeco/views/parts/MainContainer"
import React         from "react"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null
        })
    }

    render() {
        var {
            token
        } = this.props

        return (
            <MainContainer {... this.props}>
              <section className={classNames.NewEventView}>
                <h2>イベントの新規作成</h2>
                <form
                  onSubmit={(e) => {
                      e.preventDefault()

                      var form = e.target
                      postEvent({
                          token      : token,
                          title      : form.title.value,
                          start_time : form.start_time.value,
                          end_time   : form.end_time.value,
                          location   : form.location.value,
                          description: form.description.value,
                          image      : form.image.value
                      })
                  }}
                >
                  <label>
                    <div>タイトル</div>
                    <input
                      name="title"
                      type="text"
                      placeholder="例) Rubyもくもく会#1"
                      required
                    />
                  </label>
                  <label>
                    <div>日時</div>
                    <div>
                      <div>
                        <input
                          name="start_time"
                          type="date"
                        />
                        <TimeSelect name="time_from" />
                        から
                      </div>
                      <div>
                        <input
                          name="end_time"
                          type="date"
                        />
                        <TimeSelect name="time_to" />
                        まで
                      </div>
                    </div>
                  </label>
                  <label>
                    <div>場所</div>
                    <input
                      name="location"
                      type="text"
                      placeholder="例) 研B-501"
                    />
                  </label>
                  <label>
                    <div>説明</div>
                    <textarea
                      name="description"
                      placeholder="例) Ruby初心者歓迎!!"
                      rows="8"
                    />
                  </label>
                  <label>
                    <div>画像</div>
                    <input
                      name="image"
                      type="file"
                    />
                  </label>
                  <FormButton type="submit">
                    作成
                  </FormButton>
                </form>
              </section>
            </MainContainer>
        )
    }
}

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
