let GroupList     = require("neeco-client/ui/view/group/GroupList")
let GroupListItem = require("neeco-client/ui/view/group/GroupListItem")
let React         = require("react")
let Indicator     = require("react-material/ui/view/Indicator")
let Search        = require("react-material/ui/view/Search")

let classNames = require("neeco-client/ui/view/group/GroupSearchPage/classNames")

module.exports = ({
    className,
    loading,
    groups,
    onNext,
    onQuery,
    ...props
}) => 
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    >
        <form
            className={classNames.SearchForm}
            onSubmit={async e => {
                e.preventDefault()

                let form = e.target

                onQuery(form.elements["query"].value)
            }}
        >
            <Search
                name="query"
                placeholder="検索"
            />
        </form>
        <GroupList
            type={"grid"}
        >
            {groups && groups.map(
                x =>
                    <GroupListItem
                        group={x}
                        key={x.id}
                    />
            )}
        </GroupList>
        <Indicator
            loaded={groups && groups.length >= groups.totalCount}
            loading={loading}
            onNext={onNext}
        />
    </div>
