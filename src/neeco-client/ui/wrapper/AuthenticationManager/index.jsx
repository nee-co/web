let Client           = require("neeco-client/api/Client")
let getConfiguration = require("neeco-client/api/getConfiguration")
let DeleteToken      = require("neeco-client/api/request/DeleteToken")
let React            = require("react")

let createClient = (token, onError) => {
    let configuration = getConfiguration()
    configuration.api.token = token

    let client = Client({
        configuration: configuration
    })

    return Object.assign(
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
}

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            client   : undefined,
            listeners: []
        })
    }

    componentDidMount() {
        let {
            location,
            onError,
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

            let client = createClient(storage.getItem("token"), onError)

            for (let f of this.state.listeners)
                f(client)

            this.setState({
                client   : client,
                listeners: []
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
            location,
            onError,
            ...props
        } = this.props

        return React.cloneElement(
            children,
            {
                client       : (
                    location.pathname == "/sign_in" ? createClient(undefined, onError)
                  :                                   this.state.client
                ),
                configuration: this.state.client && this.state.client.configuration,
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

                    let client = createClient(token, onError)

                    for (let f of this.state.listeners)
                        f(client)

                    this.setState({
                        client   : client,
                        listeners: []
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
                         client: undefined
                    })

                    await this.state.client(DeleteToken())

                    router.push({
                        pathname: "/sign_in",
                        state   : {
                            nextLocation: location
                        }
                    })
                },
                withClient: f => {
                    if (this.state.client)
                        f(this.state.client)
                    else
                        this.state.listeners.push(f)
                },
                ...props
            }
        )
    }
}
