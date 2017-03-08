let GetUserByNumber = require("neeco-client/api/request/GetUserByNumber")
let colorOfCollege  = require("neeco-client/graphics/colorOfCollege")
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
                <div>
                    <Image
                        alt={this.state.user && this.state.user.name}
                        src={this.state.user && this.state.user.image}
                        width="64"
                        height="64"
                    />
                    <h2>{this.state.user && this.state.user.name}</h2>
                    <p
                        className={classNames.Number}
                        style={{
                            color: this.state.user && colorOfCollege(this.state.user.college)
                        }}
                    >
                        {this.state.user && this.state.user.college.name}
                    </p>
                    <p>{this.state.user && this.state.user.number}</p>
                </div>
            </section>
        )
    }
}

