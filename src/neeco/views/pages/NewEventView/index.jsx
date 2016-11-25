var postEvent     = require("neeco/api/event/postEvent")
var classNames    = require("neeco/views/pages/NewEventView/classNames")
var FormButton    = require("neeco/views/parts/FormButton")
var MainContainer = require("neeco/views/parts/MainContainer")
var React         = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null,
            description: ""
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
                    <div>画像</div>
                    <input
                      name="image"
                      type="file"
                    />
                  </label>
                  <label>
                    <div>説明</div>
                    <Editor
                      onKeyDown={(e) => {
                          this.setState({
                              description: this.state.description + "a"
                          })
                      }}
                    >
                      {this.state.description}
                    </Editor>
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

var Editor = class extends React.Component {
    componentWillMount() {
        this.setState({
            focused  : false,
            onKeyDown: (e) => {
                if (this.state.focused)
                    this.props.onKeyDown(e)
            }
        })
    }

    componentDidMount() {
        window.addEventListener("keydown", this.state.onKeyDown)
    }
  
    componentWillUnmount() {
        window.removeEventListener("keydown", this.state.onKeyDown)
    }

    render() {
        var {
            children
        } = this.props

        return (
            <div
              className={classNames.Editor}
              onMouseDown={() => {
                  this.setState({
                      focused: true
                  })
              }}
            >
              {children}
            </div>
        )
    }
}

