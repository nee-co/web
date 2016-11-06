import React      from "react"
import login      from "neeco/api/auth/login"
import SignInView from "neeco/views/SignInView"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            token: sessionStorage.getItem("token")
                || localStorage.getItem("token")
        })
    }

    render() {
        var {token} = this.state

        if (token)
            return React.cloneElement(this.props.children, {
                token: token
            })
        else
            return <SignInView onSubmit={(id, password, auto_login) => 
                login(id, password)
                    .then(({token}) => {
                        sessionStorage.setItem("token", token)

                        if (auto_login)
                            localStorage.setItem("token", token)

                        this.setState({token: token})
                    })
                    .catch((e) => {
                    })
            }/>
    }
}
