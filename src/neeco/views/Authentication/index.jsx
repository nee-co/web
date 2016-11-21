import createToken    from "neeco/api/auth/createToken"
import getCurrentUser from "neeco/api/user/getCurrentUser"
import SignInView     from "neeco/views/pages/SignInView"
import React          from "react"

export default class extends React.Component {
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
        var props = this.props
        var state = this.state

        if (state.token)
            return React.cloneElement(props.children, {
                token    : state.token,
                user     : state.user,
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
