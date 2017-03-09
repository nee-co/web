let GetUserByToken = require("neeco-client/api/request/GetUserByToken")
let React          = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            user: undefined
        })
    }

    componentDidMount() {
        let {
            client
        } = this.props

        if (client.configuration.api.token)
            (async () => 
                this.setState({
                    user: await client(GetUserByToken())
                })
            )()
    }

    componentWillReceiveProps({
        client
    }) {
        if (
            client.configuration.api.token
         && client.configuration.api.token != this.props.client.configuration.api.token
        )
            (async () =>
                this.setState({
                    user: await client(GetUserByToken())
                })
            )()
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
                ...props
            }
        )
    }
}
