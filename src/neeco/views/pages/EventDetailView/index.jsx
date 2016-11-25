var classNames    = require("neeco/views/pages/EventsView/classNames")
var MainContainer = require("neeco/views/parts/MainContainer")
var React         = require("react")

module.exports = (props) =>
    <MainContainer {...props}>
      <section className={classNames.EventView}>
        <h2>イベント詳細</h2>
      </section>
    </MainContainer>
