var classNames = require("neeco/views/parts/FormButton/classNames")
var React      = require("react")

module.exports = (props) =>
    <button {... props} className={classNames.FormButton + " " + props.className} />
