var createEvent = require("neeco/api/event/createEvent")
var classNames  = require("neeco/ui/page/event_creation/Page/classNames")
var Editor      = require("neeco/ui/view/Editor")
var FormButton  = require("neeco/ui/view/form/Button")
var Input       = require("neeco/ui/view/form/Input")
var MainLayout  = require("neeco/ui/view/MainLayout")
var React       = require("react")

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
            <MainLayout
                {... this.props}
            >
                <section
                    className={classNames.NewEventPage}
                >
                    <h2>イベントの新規作成</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()

                            var formData = new FormData(e.target)

                            createEvent({
                                apiHost    : process.env.NEECO_API_HOST,
                                token      : token,
                                title      : formData.getAll("title"),
                                startDate  : formData.getAll("startDate"),
                                description: "test",
                                image      : formData.getAll("image")
                            })
                        }}
                    >
                        <label>
                            <span>タイトル</span>
                            <Input
                                name="title"
                                type="text"
                                placeholder="例) Rubyもくもく会#1"
                                required
                            />
                        </label>
                        <label>
                            <span>日時</span>
                            <span>
                                <Input
                                    name="startDate"
                                    type="date"
                                />
                            </span>
                        </label>
                        <label>
                            <span>画像</span>
                            <Input
                                name="image"
                                type="file"
                            />
                        </label>
                        <div>
                            <span>説明</span>
                            <Editor>
                                {this.state.description}
                            </Editor>
                        </div>
                        <FormButton>
                            作成
                        </FormButton>
                    </form>
                </section>
            </MainLayout>
        )
    }
}

var TimeSelect = (props) =>
    <select
        {... props}
    >
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
