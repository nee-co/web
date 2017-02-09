let toEvent = require("neeco-client/api/event/toEvent")

module.exports = x => ({
    data      : (x["events"] || x["elements"]).map(toEvent),
    totalCount: x["total_count"]
})
