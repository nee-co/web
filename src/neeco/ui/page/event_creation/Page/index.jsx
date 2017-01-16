let createEvent = require("neeco/api/event/createEvent")
let classNames  = require("neeco/ui/page/event_creation/Page/classNames")
let Editor      = require("neeco/ui/view/Editor")
let FormButton  = require("neeco/ui/view/form/Button")
let ImageInput  = require("neeco/ui/view/form/ImageInput")
let TextField   = require("neeco/ui/view/form/TextField")
let React       = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error      : null,
            description: "",
            imageURL   : undefined
        })
    }

    render() {
        let {
            token
        } = this.props

        return (
            <section
                className={classNames.NewEventPage}
            >
                <h2>イベントの新規作成</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()

                        let formData = new FormData(e.target)

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
                    <TextField
                        labelText={"タイトル"}
                        name="title"
                        required
                    />
                    <TextField
                        labelText={"日時"}
                        name="startDate"
                        required
                        type="date"
                        defaultValue={
                            new Date().toISOString().slice(0, 10)
                        }
                    />
                    <ImageInput
                        labelText={"イベント画像"}
                        name="image"
                    />
                    <div>
                        <span>説明</span>
                        <Editor>
                            {this.state.description}
                        </Editor>
                    </div>
                    <div>
                        <FormButton
                            type="raised"
                        >
                            作成
                        </FormButton>
                    </div>
                </form>
            </section>
        )
    }
}

let TimeSelect = (props) =>
    <select
        {...props}
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
