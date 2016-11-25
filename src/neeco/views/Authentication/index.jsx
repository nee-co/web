var createToken    = require("neeco/api/auth/createToken")
var getCurrentUser = require("neeco/api/user/getCurrentUser")
var SignInView     = require("neeco/views/pages/SignInView")
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

            getCurrentUser({token: token})
                .then((user) => this.setState({user: user}))
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
            return <SignInView onSubmit={({userName, password, staySignedIn}) => 
                createToken({
                    userName: userName,
                    password: password
                })
                    .then((token) => {
                        sessionStorage.setItem("token", token)

                        if (staySignedIn)
                            localStorage.setItem("token", token)

                        this.setState({token: token})
                    })
                    .catch((e) => {
                    })
            }/>
    }
}
