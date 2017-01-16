let getUserByToken = require("neeco/api/user/getUserByToken")
let SignInPage     = require("neeco/ui/page/sign_in/Page")
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
                let user = await getUserByToken({
                    apiHost: process.env.NEECO_API_HOST,
                    token  : token
                })

                this.setState({user: user})
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
                onSignOut: () => {
                    sessionStorage.removeItem("token")
                    localStorage.removeItem("token")

                    this.setState({token: null})
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

                            this.setState({token: token})

                            let user = await getUserByToken({
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
