let UpdateEvent        = require("neeco-client/api/request/UpdateEvent")
let Editor             = require("neeco-client/ui/view/Editor")
let React              = require("react")
let Button             = require("react-material/ui/view/Button")
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel")
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList")
let ListItem           = require("react-material/ui/view/LinearLayout")
let LinearLayout       = require("react-material/ui/view/ListItem")
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace")
let DropdownButton     = require("react-material/ui/view/form/DropdownButton")
let ImageInput         = require("react-material/ui/view/form/ImageInput")
let TextField          = require("react-material/ui/view/form/TextField")
let Toggle             = require("react-material/ui/view/form/Toggle")

let classNames = require("neeco-client/ui/view/event/EventSettingsPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: undefined
        })
    }

    render() {
        let {
            className,
            client,
            event,
            onChange,
            ...props
        } = this.props

        let Buttons = x =>
            <LinearLayout
                orientation="horizontal"
                {...x}
            >
                <FlexibleSpace />
                <Button
                    onClick={e => this.setState({
                        selectedIndex: undefined
                    })}
                >
                    取消
                </Button>
                <Button
                    component="button"
                >
                    保存
                </Button>
            </LinearLayout>

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host
                    ].join(" ")
                }
                {...props}
            >
                <ExpansionPanelList
                    onSelected={({index}) => this.setState({
                        selectedIndex: index
                    })}
                    onUnselected={({index}) => this.setState({
                        selectedIndex: undefined
                    })}
                    selectedIndexes={
                        this.state.selectedIndex == undefined ? []
                      :                                         [this.state.selectedIndex]
                    }
                >
                    <ExpansionPanel
                        hintText="イベントの検索、参加可否を設定します。"
                        labelText="公開設定"
                        value={
                            event.isPublic ? "公開"
                          :                  "非公開"
                        }
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onChange(await client(UpdateEvent({
                                    event: {
                                        id      : event.id,
                                        isPublic: form.elements["is_public"].checked
                                    }
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <Toggle
                                defaultChecked={event && event.isPublic}
                                labelText="公開する"
                                name="is_public"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="タイトル"
                        value={event.title}
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onChange(await client(UpdateEvent({
                                    event: {
                                        id   : event.id,
                                        title: form.elements["title"].value
                                    }
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <TextField
                                defaultValue={event.title}
                                name="title"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="開催日"
                        value={event.startDate}
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onChange(await client(UpdateEvent({
                                    event: {
                                        id       : event.id,
                                        startDate: form.elements["start_date"].value
                                    }
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <TextField
                                defaultValue={event.startDate}
                                name="start_date"
                                type="date"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        hintText="画像の更新が適用されるまで数分程かかります。"
                        labelText="画像"
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onChange(await client(UpdateEvent({
                                    event: {
                                        id   : event.id,
                                        image: form.elements["image"].files
                                    }
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <ImageInput
                                defaultImageURL={event.image}
                                name="image"
                                width="128"
                                height="128"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="イベント内容"
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onChange(await client(UpdateEvent({
                                    event: {
                                        description: form.elements["description"].value
                                    }
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <Editor
                                defaultValue={event.description}
                                name="description"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                </ExpansionPanelList>
            </div>
        )
    }
}
