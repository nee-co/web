let GetUserByNumber = require("neeco-client/api/request/GetUserByNumber")
let ListUsers       = require("neeco-client/api/request/ListUsers")
let React           = require("react")
let Button          = require("react-material/ui/view/Button")
let Dialog          = require("react-material/ui/view/Dialog")
let DialogBody      = require("react-material/ui/view/DialogBody")
let DialogHeader    = require("react-material/ui/view/DialogHeader")
let DialogFooter    = require("react-material/ui/view/DialogFooter")
let List            = require("react-material/ui/view/List")
let ListItem        = require("react-material/ui/view/ListItem")
let ListItemAvatar  = require("react-material/ui/view/ListItemAvatar")
let ImageInput      = require("react-material/ui/view/form/ImageInput")
let TextField       = require("react-material/ui/view/form/TextField")
let Toggle          = require("react-material/ui/view/form/Toggle")

let classNames = require("neeco-client/ui/view/event/NewEventDialog/classNames")

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

        return (
            <Dialog
                className={classNames.Host}
                component="form"
                onCancel={onCancel}
                onSubmit={async e => {
                    e.preventDefault()

                    let form = e.target

                    let query = form.elements["query"].value

                    if (/^G/.test(query)) {
                        this.setState({
                            users: await client(ListUsers({
                                query : query,
                                limit : 5,
                                offset: 0
                            }))
                        })
                    } else {
                        this.setState({
                            users: await client(ListUsers({
                                query : query,
                                limit : 5,
                                offset: 0
                            }))
                        })
                    }

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
                        required
                    />
                    <List>
                        {this.state.users.map(
                            x => 
                                <ListItem
                                    selected={this.state.user && x.id == this.state.user.id}
                                    onClick={e => {
                                        this.setState({
                                            user: this.state.user && x.id == this.state.user.id
                                                ? undefined
                                                : x
                                        })
                                    }}
                                >
                                    <ListItemAvatar
                                        src={x.image}
                                    />
                                </ListItem>
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
