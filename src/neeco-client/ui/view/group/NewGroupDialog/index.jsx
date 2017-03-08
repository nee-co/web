let React        = require("react")
let Button       = require("react-material/ui/view/Button")
let Dialog       = require("react-material/ui/view/Dialog")
let DialogBody   = require("react-material/ui/view/DialogBody")
let DialogHeader = require("react-material/ui/view/DialogHeader")
let DialogFooter = require("react-material/ui/view/DialogFooter")
let ImageInput   = require("react-material/ui/view/form/ImageInput")
let TextField    = require("react-material/ui/view/form/TextField")
let Toggle       = require("react-material/ui/view/form/Toggle")

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
                name    : form.elements["name"].value,
                note    : form.elements["note"].value,
                image   : form.elements["image"].files,
                isPublic: form.elements["is_public"].checked
            })
        }}
        {...props}
    >
        <DialogHeader>
            新規グループ
        </DialogHeader>
        <DialogBody>
            <TextField
                labelText={"グループ名"}
                name="name"
                required
            />
            <ImageInput
                labelText={"グループ画像"}
                name="image"
            />
            <TextField
                labelText={"ノート"}
                multiLine
                name="note"
                required
            />
            <Toggle
                labelText={"公開"}
                name="is_public"
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
