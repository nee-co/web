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
            storage  : undefined,
            unmounted: false
        })
    }

    componentDidMount() {
        let storage = (
            sessionStorage.getItem("token") ? sessionStorage
          : localStorage.getItem("token")   ? localStorage
          :                                   undefined
        )

        if (storage) {
            let {location} = this.props
            let {router} = this.props

            if (location.pathname == "/sign_in")
                router.push("/")

            let {onError} = this.props

            this.setState({
                client : createClient(storage.getItem("token"), onError),
                storage: storage
            })
        } else {
            let {location} = this.props
            let {router} = this.props

            if (location.pathname != "/sign_in")
                router.push({
                    pathname: "/sign_in",
                    state   : {
                        nextLocation: location
                    }
                })
        }
    }

    componentWillUnmount() {
        this.setState({
            unmounted: true
        })
    }

    render() {
        let {
            children,
            location,
            onError,
            ...props
        } = this.props

        if (
            location.pathname != "/sign_in"
         && !this.state.client
        )
            return null

        return React.cloneElement(
            children,
            {
                client    : (
                    location.pathname == "/sign_in" ? createClient(undefined, onError)
                  :                                   this.state.client
                ),
                getClient : async () => new Promise(
                    (resolve, reject) => {
                        let loop = () =>
                            this.state.unmounted ? reject("component is unmounted")
                          : this.state.client    ? resolve(this.state.client)
                          :                        setTimeout(loop, 100)

                        loop()
                    }
                ),
                onError  : onError,
                onSignIn : async ({
                    token,
                    staySignedIn
                }) => {
                    let storage = staySignedIn ? localStorage
                                :                sessionStorage
                    storage.setItem("token", token)

                    this.setState({
                        client : createClient(token, onError),
                        storage: storage
                    })

                    let {router} = this.props

                    router.push((location.state && location.state.nextLocation) || "/")
                },
                onSignOut: async () => {
                    this.state.storage.removeItem("token")

                    this.setState({
                        client : undefined,
                        storage: undefined
                    })

                    await this.state.client(DeleteToken())

                    let {router} = this.props

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
