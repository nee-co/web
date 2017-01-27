let getGroups = require("neeco/api/group/getGroups")
let React     = require("react")
let {Link}    = require("react-router")

let classNames = require("neeco/ui/page/groups/Page/classNames")

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
        (async () => {
            let groups = await getGroups({
                apiHost: process.env.NEECO_API_HOST,
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
                className={classNames.GroupPage}
            >
                <h2>グループ</h2>
            </section>
        )
    }
}
