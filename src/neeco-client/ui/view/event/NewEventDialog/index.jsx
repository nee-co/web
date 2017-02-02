let createEvent  = require("neeco-client/api/event/createEvent")
let config       = require("neeco-client/config")
let Editor       = require("neeco-client/ui/view/Editor")
let React        = require("react")
let Button       = require("react-material/ui/view/Button")
let Dialog       = require("react-material/ui/view/Dialog")
let DialogBody   = require("react-material/ui/view/DialogBody")
let DialogHeader = require("react-material/ui/view/DialogHeader")
let DialogFooter = require("react-material/ui/view/DialogFooter")
let ImageInput   = require("react-material/ui/view/form/ImageInput")
let TextField    = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/event/NewEventDialog/classNames")

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
            token,
            onCancel,
            ...props
        } = this.props

        return (
            <Dialog
                className={classNames.Host}
                onCancel={onCancel}
                {...props}
            >
                <DialogHeader>  
                    イベントの新規作成
                </DialogHeader>
                <DialogBody
                    component="form"
                    id="new_event_form"
                    onSubmit={(e) => {
                        e.preventDefault()

                        let formData = new FormData(e.target)

                        createEvent({
                            apiHost: config["neeco_api_host"],
                            token  : token,
                            event  : {
                                title      : formData.getAll("title"),
                                startDate  : formData.getAll("startDate"),
                                description: "",
                                image      : formData.getAll("image")
                            }
                        })
                    }}
                >
                    <div>
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
                    </div>
                    <ImageInput
                        labelText={"イベント画像"}
                        name="image"
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={onCancel}
                        type="flat"
                    >
                        キャンセル
                    </Button>
                    <Button
                        form="new_event_form"
                        component="button"
                        type="flat"
                    >
                        作成
                    </Button>
                </DialogFooter>
            </Dialog>
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
