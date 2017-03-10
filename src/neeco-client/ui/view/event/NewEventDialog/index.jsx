let React        = require("react")
let Button       = require("react-material/ui/view/Button")
let Dialog       = require("react-material/ui/view/Dialog")
let DialogBody   = require("react-material/ui/view/DialogBody")
let DialogHeader = require("react-material/ui/view/DialogHeader")
let DialogFooter = require("react-material/ui/view/DialogFooter")
let ImageInput   = require("react-material/ui/view/form/ImageInput")
let TextField    = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/event/NewEventDialog/classNames")

module.exports = ({
    onCancel,
    onDone,
    ...props
}) =>
    <Dialog
        className={classNames.Host}
        component="form"
        onCancel={onCancel}
        onSubmit={e => {
            e.preventDefault()

            let form = e.target

            onDone({
                title      : form.elements["title"].value,
                startDate  : form.elements["startDate"].value,
                description: "&nbsp;",
                image      : form.elements["image"].files
            })
        }}
        {...props}
    >
        <DialogHeader>
            新規イベント
        </DialogHeader>
        <DialogBody>
            <TextField
                labelText={"タイトル"}
                name="title"
                required
            />
            <TextField
                defaultValue={new Date().toISOString().slice(0, 10)}
                labelText={"日時"}
                name="startDate"
                required
                type="date"
            />
            <ImageInput
                labelText={"イベント画像"}
                name="image"
            />
        </DialogBody>
        <DialogFooter>
            <Button
                onClick={onCancel}
            >
                キャンセル
            </Button>
            <Button
                component="button"
            >
                作成
            </Button>
        </DialogFooter>
    </Dialog>

let TimeSelect = props =>
    <select
        {...props}
    >
        {
            Array.from(Array(24).keys())
                .map(x => ("0" + x).slice(-2))
                .map(x => [
                    <option
                        key={x}
                        value={x + ":00:00"}
                    >
                        {x + ":00"}
                    </option>,
                    <option
                        key={x + 24}
                        value={x + ":30:00"}
                    >
                        {x + ":30"}
                    </option>
                ])
                .reduce((x, y) => x.concat(y))
        }
    </select>
