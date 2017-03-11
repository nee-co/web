let GetUserByNumber = require("neeco-client/api/request/GetUserByNumber")
let ListUsers       = require("neeco-client/api/request/ListUsers")
let React           = require("react")
let Button          = require("react-material/ui/view/Button")
let Dialog          = require("react-material/ui/view/Dialog")
let DialogBody      = require("react-material/ui/view/DialogBody")
let DialogHeader    = require("react-material/ui/view/DialogHeader")
let DialogFooter    = require("react-material/ui/view/DialogFooter")
let List            = require("react-material/ui/view/List")
let UserListItem    = require("neeco-client/ui/view/user/UserListItem")
let ImageInput      = require("react-material/ui/view/form/ImageInput")
let TextField       = require("react-material/ui/view/form/TextField")
let Toggle          = require("react-material/ui/view/form/Toggle")

let classNames = require("neeco-client/ui/view/group/InviteGroupDialog/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            users: []
        })
    }

    render() {
        let {
            client,
            onCancel,
            onDone,
            invitees,
            members,
            ...props
        } = this.props

        let onQueryUpdate = async x => {
            if (/^G/.test(x))
                this.setState({
                    users: await client(ListUsers({
                        query : x,
                        limit : 3,
                        offset: 0
                    }))
                })
            else
                this.setState({
                    users: await client(ListUsers({
                        query : x,
                        limit : 3,
                        offset: 0
                    }))
                })
        }

        return (
            <Dialog
                className={classNames.Host}
                component="form"
                onCancel={onCancel}
                onSubmit={e => {
                    e.preventDefault()
                }}
                {...props}
            >
                <DialogHeader>
                    グループ招待
                </DialogHeader>
                <DialogBody>
                    <TextField
                        labelText={"学籍番号または氏名"}
                        name="query"
                        onInput={e => onQueryUpdate(e.target.value)}
                        required
                    />
                    <List>
                        {this.state.users.map(
                            x => 
                                <UserListItem
                                    key={x.id}
                                    selected={this.state.user && x.id == this.state.user.id}
                                    onClick={e => {
                                        this.setState({
                                            user: this.state.user && x.id == this.state.user.id
                                                ? undefined
                                                : x
                                        })
                                    }}
                                    to={null}
                                    user={x}
                                />
                        )}
                    </List>
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={onCancel}
                    >
                        キャンセル
                    </Button>
                    <Button
                        disabled={this.state.user == undefined}
                        onClick={e => {
                            if (this.state.user)
                                onDone(this.state.user)
                        }}
                    >
                        招待
                    </Button>
                </DialogFooter>
            </Dialog>
        )
    }
}
