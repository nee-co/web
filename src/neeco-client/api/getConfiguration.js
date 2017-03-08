let getConfigurationFromEnv = require("neeco-client/api/getConfigurationFromEnv")

module.exports = () => Object.assign(
    getConfigurationFromEnv()
)
