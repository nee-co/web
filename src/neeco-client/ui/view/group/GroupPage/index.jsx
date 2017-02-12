let getGroups = require("neeco-client/api/group/getGroups")
let apply     = require("neeco-client/apply")
let config    = require("neeco-client/config")
let Error     = require("neeco-client/ui/view/Error")
let React     = require("react")
let Snackbar  = require("react-material/ui/view/Snackbar")
let {Link}    = require("react-router")

let classNames = require("neeco-client/ui/view/group/GroupPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            groups: [],
            error : undefined
        })
    }

    componentDidMount() {
        let {
            onError,
            store
        } = this.props

        ;(async () => {
            try {
                let groups = await getGroups({
                    apiHost: config["neeco_api_host"],
                    token  : apply(store, "token"),
                    limit  : 10
                })

                this.setState({groups: groups})
            } catch (e) {
                onError(e)
            }
        })()
    }

    render() {
        let {
            store
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
            </section>
        )
    }
}
