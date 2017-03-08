let Editor             = require("neeco-client/ui/view/Editor")
let React              = require("react")
let Button             = require("react-material/ui/view/Button")
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel")
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList")
let LinearLayout       = require("react-material/ui/view/LinearLayout")
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace")
let ImageInput         = require("react-material/ui/view/form/ImageInput")
let TextField          = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/group/GroupSettingsPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: undefined
        })
    }

    render() {
        let {
            className,
            group,
            onGroupUpdate,
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
                        labelText="グループ名"
                        value={group && group.name}
                    >
                        <form
                            onSubmit={e => {
                                e.preventDefault()

                                let form = e.target

                                onGroupUpdate({
                                    id  : group.id,
                                    name: form.elements["name"].value
                                })

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <TextField
                                defaultValue={group && group.name}
                                name="name"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        hintText="画像の更新が適用されるまで数分程かかります。"
                        labelText="グループ画像"
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onGroupUpdate({
                                    id   : group.id,
                                    image: form.elements["image"].files
                                })

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <ImageInput
                                defaultImageURL={group && group.image}
                                name="image"
                                width="128"
                                height="128"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="ノート"
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onGroupUpdate({
                                    id  : group.id,
                                    note: form.elements["note"].value
                                })

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <Editor
                                defaultValue={group && group.note}
                                name="note"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                </ExpansionPanelList>
            </div>
        )
    }
}
