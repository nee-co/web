let deleteToken    = require("neeco-client/api/auth/deleteToken")
let getUserByToken = require("neeco-client/api/user/getUserByToken")
let apply          = require("neeco-client/apply")
let config         = require("neeco-client/config")
let React          = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            store: undefined
        })
    }

    componentDidMount() {
        let {
            location,
            router
        } = this.props

        let store = (
            apply(sessionStorage, "token") ? sessionStorage
          : apply(localStorage, "token")   ? localStorage
          :                                  undefined
        )

        if (store) {
            if (location.pathname == "/sign_in")
                router.push("/")

            this.setState({
                store: store
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
            router,
            ...props
        } = this.props

        if (this.state.store)
            return React.cloneElement(
                children,
                {
                    onSignOut: async () => {
                        try {
                            await deleteToken({
                                apiHost: config["neeco_api_host"],
                                token  : apply(this.state.store, "token")
                            })
                        } catch (e) {
                            console.log(e)
                        }

                        this.state.store.removeItem("token")
                        this.state.store.removeItem("user")

                        this.setState({
                            store: undefined
                        })

                        router.push({
                            pathname: "/sign_in",
                            state   : {
                                nextLocation: location
                            }
                        })
                    },
                    store: this.state.store
                }
            )
        else if (location.pathname == "/sign_in")
            return React.cloneElement(
                children,
                {
                    onSignIn: async ({
                        token,
                        staySignedIn
                    }) => {
                        let store = staySignedIn ? localStorage
                                  :                sessionStorage

                        try {
                            let user = await getUserByToken({
                                apiHost: config["neeco_api_host"],
                                token  : token
                            })

                            store.setItem("token", JSON.stringify(token))
                            store.setItem("user", JSON.stringify(user))

                            this.setState({
                                store: store
                            })

                            router.push(location.state.nextLocation || "/")
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
            )
        else
            return null
    }
}
