let EventDetailPage      = require("neeco-client/ui/view/event/EventDetailPage")
let EventPage            = require("neeco-client/ui/view/event/EventPage")
let EventPageTitle       = require("neeco-client/ui/view/event/EventPageTitle")
let FolderDetailPage     = require("neeco-client/ui/view/file/FolderDetailPage")
let FolderPage           = require("neeco-client/ui/view/file/FolderPage")
let FolderPageTitle      = require("neeco-client/ui/view/file/FolderPageTitle")
let GroupDetailPage      = require("neeco-client/ui/view/group/GroupDetailPage")
let GroupPage            = require("neeco-client/ui/view/group/GroupPage")
let GroupPageTitle       = require("neeco-client/ui/view/group/GroupPageTitle")
let SettingsPage         = require("neeco-client/ui/view/settings/SettingsPage")
let SettingsPageTitle    = require("neeco-client/ui/view/settings/SettingsPageTitle")
let PasswordSettingsPage = require("neeco-client/ui/view/settings/PasswordSettingsPage")
let TopPage              = require("neeco-client/ui/view/top/TopPage")
let TopPageTitle         = require("neeco-client/ui/view/top/TopPageTitle")
let Authentication       = require("neeco-client/ui/wrapper/Authentication")
let MainLayout           = require("neeco-client/ui/wrapper/MainLayout")
let React                = require("react")
let {Route}              = require("react-router")
let {Router}             = require("react-router")
let {browserHistory}     = require("react-router")

module.exports = (props) =>
    <Router
        {...props}
        history={browserHistory}
    >
        <Route
            component={({children, ...props}) =>
                <Authentication
                    {...props}
                >
                    <MainLayout
                        children={children}
                    />
                </Authentication>
            }
        >
            <Route
                path="/"
                components={{
                    main : TopPage,
                    title: TopPageTitle
                }}
            />
            <Route
                path="/events"
                components={{
                    main : EventPage,
                    title: EventPageTitle
                }}
            />
            <Route
                path="/events/:event_id"
                components={{
                    main : EventDetailPage,
                    title: EventPageTitle
                }}
            />
            <Route
                path="/events/:event_id/comments"
                components={{
                    main : EventDetailPage,
                    title: EventPageTitle
                }}
            />
            <Route
                path="/events/:event_id/entries"
                components={{
                    main : EventDetailPage,
                    title: EventPageTitle
                }}
            />
            <Route
                path="/folders"
                components={{
                    main : FolderPage,
                    title: FolderPageTitle
                }}
            />
            <Route
                path="/folders/:folder_id"
                components={{
                    main : FolderDetailPage,
                    title: FolderPageTitle
                }}
            />
            <Route
                path="/groups"
                components={{
                    main : GroupPage,
                    title: GroupPageTitle
                }}
            />
            <Route
                path="/settings"
                components={{
                    main : SettingsPage,
                    title: SettingsPageTitle
                }}
            />
            <Route
                path="/settings/password"
                components={{
                    main : PasswordSettingsPage,
                    title: SettingsPageTitle
                }}
            />
        </Route>
    </Router>
