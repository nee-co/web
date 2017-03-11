let GetUserByToken = require("neeco-client/api/request/GetUserByToken")
let React          = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            listeners: [],
            user     : undefined
        })
    }

    componentDidMount() {
        let {withClient} = this.props

        withClient(async client => {
            let user = await client(GetUserByToken())

            for (let f of this.state.listeners)
                f(user)

            this.setState({
                user: user
            })
        })
    }

    render() {
        let {
            children,
            ...props
        } = this.props

        return React.cloneElement(
            children,
            {
                onUserUpdate: user => this.setState({
                    user: user
                }),
                user        : this.state.user,
                withUser    : f => {
                    if (this.state.user)
                        f(this.state.user)
                    else
                        this.state.listeners.push(f)
                },
                ...props
            }
        )
    }
}
