let getGroups = require("neeco-client/api/group/getGroups")
let config    = require("neeco-client/config")
let React     = require("react")
let {Link}    = require("react-router")

let classNames = require("neeco-client/ui/view/group/GroupPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            groups: []
        })
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps({
        token
    }) {
        ;(async () => {
            let groups = await getGroups({
                apiHost: config["neeco_api_host"],
                token  : token,
                limit  : 10
            })

            this.setState({groups: groups})
        })()
    }

    render() {
        let {
            token
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
            </section>
        )
    }
}
