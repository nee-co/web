let toEvent = require("neeco/api/event/toEvent")

module.exports = (result) => ({
    data      : (result["events"] || result["elements"]).map(toEvent),
    totalCount: result["total_count"]
})
