let deleteToken    = require("neeco-client/api/auth/deleteToken")
let getUserByToken = require("neeco-client/api/user/getUserByToken")
let config         = require("neeco-client/config")
let React          = require("react")
let {withRouter}   = require("react-router")

module.exports = withRouter(class extends React.Component {
    componentWillMount() {
        this.setState({
            token: null,
            user : null
        })
    }

    componentDidMount() {
        let {
            location,
            router
        } = this.props

        let token = sessionStorage.getItem("token")
                 || localStorage.getItem("token")

        if (token) {
            this.setState({
                token: token
            })

            ;(async () => {
                this.setState({
                    user: await getUserByToken({
                        apiHost: config["neeco_api_host"],
                        token  : token
                    })
                })
            })()

            if (location.pathname == "/sign_in")
                router.push("/")
        } else {
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

        if (this.state.token)
            return React.cloneElement(children, {
                token    : this.state.token,
                user     : this.state.user,
                onSignOut: async () => {
                    sessionStorage.removeItem("token")
                    localStorage.removeItem("token")

                    try {
                        await deleteToken({
                            apiHost: config["neeco_api_host"],
                            token  : this.state.token
                        })
                    } catch (e) {
                    }

                    this.setState({
                        token: null
                    })

                    router.push({
                        pathname: "/sign_in",
                        state   : {
                            nextLocation: location
                        }
                    })
                },
                ...props
            })
        else
            return React.cloneElement(children, {
                onSignIn: async ({
                    token,
                    staySignedIn
                }) => {
                    sessionStorage.setItem("token", token)

                    if (staySignedIn)
                        localStorage.setItem("token", token)

                    this.setState({
                        token: token
                    })

                    router.push(location.state.nextLocation || "/")
                }
            })
    }
})
