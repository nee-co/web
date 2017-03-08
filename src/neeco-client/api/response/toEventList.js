let toEvent = require("neeco-client/api/response/toEvent")

module.exports = x => Object.assign(
    (x["events"] || x["elements"]).map(toEvent),
    {
        totalCount: x["total_count"]
    }
)
