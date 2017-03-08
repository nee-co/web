let GetUserByNumber = require("neeco-client/api/request/GetUserByNumber")
let Image           = require("react-material/ui/view/Image")
let React           = require("react")

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
                <Image
                    alt={this.state.user && this.state.user.name}
                    src={this.state.user && this.state.user.image}
                />
                {this.state.user && this.state.user.name}
            </section>
        )
    }
}

