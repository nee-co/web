let React        = require("react")
let Dialog       = require("react-material/ui/view/Dialog")
let DialogBody   = require("react-material/ui/view/DialogBody")
let DialogFooter = require("react-material/ui/view/DialogFooter")
let DialogHeader = require("react-material/ui/view/DialogHeader")
let Button       = require("react-material/ui/view/Button")
let TextField    = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/file/NewFolderDialog/classNames")

module.exports = ({
    className,
    onCancel,
    onDone,
    parent,
    ...props
}) =>
    <Dialog
        {...props}
        className={[className, classNames.Host].join(" ")}
        component="form"
        onCancel={onCancel}
        onSubmit={async e => {
            e.preventDefault()

            let form = e.target

            onDone({
                name: form.elements["name"].value
            })
        }}
    >
        <DialogHeader>
            <h4>
                新しいフォルダを作成
            </h4>
        </DialogHeader>
        <DialogBody>
            <TextField
                labelText={"フォルダ名"}
                name="name"
                onInput={e => {
                    if (parent.children.some(x => x.name == e.target.value))
                        e.target.setCustomValidity("既に同名のファイルまたはフォルダが存在します。")
                    else
                        e.target.setCustomValidity("")
                }}
                required
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
