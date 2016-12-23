var classNames = require("neeco/ui/page/top/Page/classNames")
var MainLayout = require("neeco/ui/view/MainLayout")
var React      = require("react")

module.exports = (props) =>
    <MainLayout
        {...props}
    >
        <section
            className={classNames.TopPage}
        >
            <h2>ダッシュボード</h2>
        </section>
    </MainLayout>
