var getCurrentUser = require("neeco/api/user/getCurrentUser")
var SignInPage     = require("neeco/ui/page/SignInPage")
var React          = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            token: null,
            user : null
        })
    }

    componentDidMount() {
        var token = sessionStorage.getItem("token")
                 || localStorage.getItem("token")

        if (token) {
            this.setState({token: token})

            ;(async () => {
                var user = await getCurrentUser({
                    apiHost: process.env.NEECO_API_HOST,
                    token  : token
                })

                this.setState({user: user})
            })()
        }
    }

    render() {
        var {
            children
        } = this.props

        if (this.state.token)
            return React.cloneElement(children, {
                token    : this.state.token,
                user     : this.state.user,
                onSignOut: () => {
                    sessionStorage.removeItem("token")
                    localStorage.removeItem("token")

                    this.setState({token: null})
                }
            })
        else
            return (
                <SignInPage
                    onSignIn={async ({token, staySignedIn}) => {
                        try {
                            sessionStorage.setItem("token", token)

                            if (staySignedIn)
                                localStorage.setItem("token", token)

                            this.setState({token: token})

                            var user = await getCurrentUser({
                                apiHost: process.env.NEECO_API_HOST,
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
