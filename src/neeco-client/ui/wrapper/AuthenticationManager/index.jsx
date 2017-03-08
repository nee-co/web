let Client           = require("neeco-client/api/Client")
let getConfiguration = require("neeco-client/api/getConfiguration")
let DeleteToken      = require("neeco-client/api/request/DeleteToken")
let React            = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            storage: undefined
        })
    }

    componentDidMount() {
        let {
            location,
            router
        } = this.props

        let storage = (
            sessionStorage.getItem("token") ? sessionStorage
          : localStorage.getItem("token")   ? localStorage
          :                                   undefined
        )

        if (storage) {
            if (location.pathname == "/sign_in")
                router.push("/") 

            this.setState({
                storage: storage
            })
        } else {
            if (location.pathname != "/sign_in")
                router.push({
                    pathname: "/sign_in",
                    state   : {
                        nextLocation: location
                    }
                })
        }
    }

    render() {
        let {
            children,
            onError,
            ...props
        } = this.props

        let configuration = getConfiguration()

        if (this.state.storage)
            configuration.api.token = this.state.storage.getItem("token")
        else if (location.pathname != "/sign_in")
            return null

        let client = Client({
            configuration: configuration
        })

        let proxy = Object.assign(
            async request => {
                try {
                    return await client(request)
                } catch (e) {
                    onError(e)

                    throw e
                }
            },
            client
        )

        return React.cloneElement(
            children,
            {
                client       : proxy,
                configuration: configuration,
                onError      : onError,
                onSignIn     : async ({
                    token,
                    staySignedIn
                }) => {
                    let {
                        location,
                        router
                    } = this.props

                    let storage = staySignedIn ? localStorage
                                :                sessionStorage
                    storage.setItem("token", token)

                    this.setState({
                        storage: storage
                    })

                    router.push((location.state && location.state.nextLocation) || "/")
                },
                onSignOut    : async () => {
                    let {
                        location,
                        router
                    } = this.props

                    this.state.storage.removeItem("token")

                    this.setState({
                        storage: undefined
                    })

                    await proxy(DeleteToken())

                    router.push({
                        pathname: "/sign_in",
                        state   : {
                            nextLocation: location
                        }
                    })
                },
                ...props
            }
        )
    }
}
