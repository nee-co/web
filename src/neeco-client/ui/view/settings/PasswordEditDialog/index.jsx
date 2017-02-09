let React        = require("react")
let Button       = require("react-material/ui/view/Button")
let Dialog       = require("react-material/ui/view/Dialog")
let DialogBody   = require("react-material/ui/view/DialogBody")
let DialogFooter = require("react-material/ui/view/DialogFooter")
let DialogHeader = require("react-material/ui/view/DialogHeader")
let TextField    = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/settings/PasswordEditDialog/classNames")

let onInput = e => {
    let form = e.target.form

    let password = form.elements["password"].value
    let confirmPasswordInput = form.elements["confirm_password"]

    if (confirmPasswordInput.value == password)
        confirmPasswordInput.setCustomValidity("")
    else
        confirmPasswordInput.setCustomValidity("再入力されたパスワードが一致しません。")
}

module.exports = ({
    className,
    onCancel,
    onDone,
    ...props
}) =>
    <Dialog
        {...props}
        className={[className, classNames.Host].join(" ")}
        onCancel={onCancel}
    >
        <DialogHeader>
            パスワードの変更
        </DialogHeader>
        <DialogBody
            component="form"
            id="password_edit_form"
            onSubmit={e => {
                e.preventDefault()

                let form = e.target

                onDone({
                    password       : form.elements["password"].value,
                    currentPassword: form.elements["current_password"].value
                })
            }}
        >
            <TextField
                labelText={"現在のパスワード"}
                name="current_password"
                required
                type="password"
            />
            <TextField
                labelText={"新しいパスワード"}
                name="password"
                onInput={onInput}
                required
                type="password"
            />
            <TextField
                labelText={"パスワードの再入力"}
                name="confirm_password"
                onInput={onInput}
                required
                type="password"
            />
        </DialogBody>
        <DialogFooter>
            <Button
                onClick={onCancel}
            >
                キャンセル
            </Button>
            <Button
                form="password_edit_form"
                component="button"
            >
                変更
            </Button>
        </DialogFooter>
    </Dialog>
