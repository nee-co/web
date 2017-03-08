module.exports = self => Object.assign(
    async request => request(self.configuration),
    self
)
