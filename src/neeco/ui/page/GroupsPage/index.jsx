var getGroups     = require("neeco/api/group/getGroups")
var classNames    = require("neeco/ui/page/GroupsPage/classNames")
var LinkButton    = require("neeco/ui/view/LinkButton")
var MainContainer = require("neeco/ui/view/MainContainer")
var React         = require("react")
var {Link}        = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            groups: [],
            ownedEvents: []
        })
    }

    componentDidMount() {
        getGroups({
            apiHost: process.env.NEECO_API_HOST,
            token  : this.props.token,
            limit  : 10
        })
            .then((events) => this.setState({events: events}))
            .catch((e) => {
            })
    }

    render() {
        var {
            token
        } = this.props

        return (
            <MainContainer
                {... this.props}
            >
                <section
                    className={classNames.GroupPage}
                >
                    <h2>グループ</h2>
                </section>
            </MainContainer>
        )
    }
}
