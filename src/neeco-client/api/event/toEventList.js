let toEvent = require("neeco-client/api/event/toEvent")

module.exports = x => Object.assign(
    (x["events"] || x["elements"]).map(toEvent),
    {
        totalCount: x["total_count"]
    }
)
