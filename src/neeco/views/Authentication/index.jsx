import login        from "neeco/api/auth/login"
import SignInView   from "neeco/views/SignInView"
import React        from "react"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            token: null
        })
    }

    componentDidMount() {
        this.setState({
            token: sessionStorage.getItem("token")
                || localStorage.getItem("token")
        })
    }

    render() {
        var {token} = this.state

        if (token)
            return React.cloneElement(this.props.children, {
                token: token,
                onSignOut: () => {
                    sessionStorage.removeItem("token")
                    localStorage.removeItem("token")

                    this.setState({token: null})
                }
            })
        else
            return <SignInView onSubmit={({id, password, stay_signed_in}) => 
                login({
                    id      : id,
                    password: password
                })
                    .then(({token}) => {
                        sessionStorage.setItem("token", token)

                        if (stay_signed_in)
                            localStorage.setItem("token", token)

                        this.setState({token: token})
                    })
                    .catch((e) => {
                    })
            }/>
    }
}
