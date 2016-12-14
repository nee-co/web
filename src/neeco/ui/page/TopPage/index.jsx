var classNames    = require("neeco/ui/page/TopPage/classNames")
var MainContainer = require("neeco/ui/view/MainContainer")
var React         = require("react")

module.exports = (props) =>
    <MainContainer
        {... props}
    >
        <section
            className={classNames.TopPage}
        >
            <h2>ダッシュボード</h2>
        </section>
    </MainContainer>
