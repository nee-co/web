let GetUserByToken = require("neeco-client/api/request/GetUserByToken")
let React          = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            unmounted: false,
            user     : undefined
        })
    }

    componentDidMount() {
        (async () => {
            let {getClient} = this.props

            let client = await getClient()

            let user = await client(GetUserByToken())

            this.setState({
                user: user
            })
        })()
    }

    componentWillUnmount() {
        this.setState({
            unmounted: true,
            user     : undefined
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
                getUser     : async () => new Promise(
                    (resolve, reject) => {
                        let loop = () =>
                            this.state.unmounted ? reject("component is unmounted")
                          : this.state.user      ? resolve(this.state.user)
                          :                        setTimeout(loop, 100)

                        loop()
                    }
                ),
                onUserUpdate: user => this.setState({
                    user: user
                }),
                user        : this.state.user,
                ...props
            }
        )
    }
}
