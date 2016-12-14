var classNames = require("neeco/ui/view/FormButton/classNames")
var React      = require("react")

module.exports = (props) =>
    <button
        {... props}
        className={classNames.FormButton + " " + props.className}
    />
