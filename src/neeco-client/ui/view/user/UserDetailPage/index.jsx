let GetUserByNumber = require("neeco-client/api/request/GetUserByNumber")
let colorOfCollege  = require("neeco-client/graphics/colorOfCollege")
let Markdown        = require("neeco-client/ui/view/Markdown")
let React           = require("react")
let Avatar          = require("react-material/ui/view/Avatar")
let LinearLayout    = require("react-material/ui/view/LinearLayout")

let classNames = require("neeco-client/ui/view/user/UserDetailPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            user: undefined
        })
    }

    componentDidMount() {
        let {
            client,
            params
        } = this.props

        ;(async () => {
            this.setState({
                user: await client(GetUserByNumber({
                    user: {
                        number: params["user_id"]
                    }
                }))
            })
        })()
    }

    render() {
        let {
            client,
            location,
            router
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
                <h2>{this.state.user && this.state.user.name}</h2>
                <LinearLayout
                    orientation="horizontal"
                >
                    <Avatar
                        alt={this.state.user && this.state.user.name}
                        src={this.state.user && this.state.user.image}
                        width="128"
                        height="128"
                    />
                    <dl>
                        <dt>
                            カレッジ
                        </dt>
                        <dd
                            className={classNames.Number}
                            style={{
                                color: this.state.user && colorOfCollege(this.state.user.college)
                            }}
                        >
                            {this.state.user && this.state.user.college.name}
                        </dd>
                        <dt>
                            学籍番号
                        </dt>
                        <dd>
                            {this.state.user && this.state.user.number}
                        </dd>
                    </dl>
                </LinearLayout>
                <h3>プロフィール</h3>
                <Markdown
                    srcDoc={this.state.user && this.state.user.note}
                />
            </section>
        )
    }
}

