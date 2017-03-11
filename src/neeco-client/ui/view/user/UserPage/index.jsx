let ListUsers    = require("neeco-client/api/request/ListUsers")
let UserListItem = require("neeco-client/ui/view/user/UserListItem")
let React        = require("react")
let Indicator    = require("react-material/ui/view/Indicator")
let List         = require("react-material/ui/view/List")
let Search       = require("react-material/ui/view/Search")
let TextField    = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/user/UserPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            users  : [],
            loading: false,
            loaded : false
        })
    }

    componentWillReceiveProps({
        location,
        client
    }) {
        if (location.query["q"] != this.props.location.query["q"]) {
            this.setState({
                users : [],
                loaded: false
            })
        }
    }

    render() {
        let {
            client,
            location,
            router
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <form
                    onSubmit={e => {
                        e.preventDefault()

                        let form = e.currentTarget

                        router.push({
                            ...location,
                            query: {
                                ...location.query,
                                q: form.elements["query"].value
                            }
                        })
                    }}
                >
                    <Search
                        getScrollable={x => x.parentElement.parentElement.children[1]}
                        hintText={"検索"}
                        name="query"
                    />
                </form>
                <div>
                    <List
                        className={classNames.List}
                    >
                        {this.state.users && this.state.users.map(x => 
                            <UserListItem
                                key={x.id}
                                user={x}
                            />
                        )}
                    </List>
                    <Indicator
                        loaded={this.state.loaded}
                        loading={this.state.loading}
                        onNext={async e => {
                            this.setState({
                                loading: true
                            })

                            let users = await client(ListUsers({
                                query : location.query["q"] || "",
                                limit : 10,
                                offset: this.state.users.length
                            }))

                            this.setState({
                                users  : this.state.users.concat(users),
                                loading: false,
                                loaded : users.length == 0
                            })
                        }}
                    />
                </div>
            </div>
        )
    }
}
