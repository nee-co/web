var classNames    = require("neeco/views/pages/TopView/classNames")
var MainContainer = require("neeco/views/parts/MainContainer")
var React         = require("react")

module.exports = (props) =>
    <MainContainer {...props}>
      <section className={classNames.TopView}>
        <h2>ダッシュボード</h2>
      </section>
    </MainContainer>
