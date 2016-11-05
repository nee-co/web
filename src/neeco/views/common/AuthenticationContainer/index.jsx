import React      from "react"
import SignInView from "neeco/views/SignInView"

export default class extends React.Component {
    componentWillMount() {
        this.state = {
            user: {}
        }
    }

    render() {
        var {user} = this.state

        return user ? <div>{this.props.children}</div>
                    : <SignInView/>
    }
}
