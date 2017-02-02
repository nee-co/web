let deleteToken    = require("neeco-client/api/auth/deleteToken")
let getUserByToken = require("neeco-client/api/user/getUserByToken")
let config         = require("neeco-client/config")
let SignInPage     = require("neeco-client/ui/view/auth/SignInPage")
let React          = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            token: null,
            user : null
        })
    }

    componentDidMount() {
        let token = sessionStorage.getItem("token")
                 || localStorage.getItem("token")

        if (token) {
            this.setState({token: token})

            ;(async () => {
                this.setState({
                    user: await getUserByToken({
                        apiHost: config["neeco_api_host"],
                        token  : token
                    })
                })
            })()
        }
    }

    render() {
        let {
            children,
            ...props
        } = this.props

        if (this.state.token)
            return React.cloneElement(children, {
                token    : this.state.token,
                user     : this.state.user,
                onSignOut: async () => {
                    sessionStorage.removeItem("token")
                    localStorage.removeItem("token")

                    let {token} = this.state

                    this.setState({
                        token: null
                    })                    

                    await deleteToken({
                        apiHost: config["neeco_api_host"],
                        token: token
                    })
                },
                ...props
            })
        else
            return (
                <SignInPage
                    onSignIn={async ({token, staySignedIn}) => {
                        try {
                            sessionStorage.setItem("token", token)

                            if (staySignedIn)
                                localStorage.setItem("token", token)

                            this.setState({
                                token: token
                            })

                            let user = await getUserByToken({
                                apiHost: config["neeco_api_host"],
                                token  : token
                            })

                            this.setState({user: user})
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }}
                />
            )
    }
}
