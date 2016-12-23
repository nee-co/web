var getGroups  = require("neeco/api/group/getGroups")
var classNames = require("neeco/ui/page/groups/Page/classNames")
var LinkButton = require("neeco/ui/view/LinkButton")
var MainLayout = require("neeco/ui/view/MainLayout")
var React      = require("react")
var {Link}     = require("react-router")

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
            var groups = await getGroups({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                limit  : 10
            })

            this.setState({groups: groups})
        })()
    }

    render() {
        var {
            token
        } = this.props

        return (
            <MainLayout
                {...this.props}
            >
                <section
                    className={classNames.GroupPage}
                >
                    <h2>グループ</h2>
                </section>
            </MainLayout>
        )
    }
}
