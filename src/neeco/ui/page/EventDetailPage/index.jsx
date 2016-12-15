var classNames    = require("neeco/ui/page/EventPage/classNames")
var MainContainer = require("neeco/ui/view/MainContainer")
var React         = require("react")

module.exports = (props) =>
    <MainContainer
        {... props}
    >
        <section
            className={classNames.EventPage}
        >
            <h2>イベント詳細</h2>
        </section>
    </MainContainer>
