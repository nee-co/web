let toURIQuery  = require("neeco-client/encoding/toURIQuery")
let toGroup     = require("neeco-client/api/response/toGroup")
let toGroupList = require("neeco-client/api/response/toGroupList")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url
         + (
                self.joined  ? "/groups?"
              : self.invited ? "/groups/invitations?"
              :                "/groups/search?"
            )
         + toURIQuery({
                keyword: self.query,
                page   : self.page,
                per    : self.perPage,
                limit  : self.limit,
                offset : self.offset
            }),
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response
        
        let groups = toGroupList(await response.json())

        if (self.joined || self.invited) {
            return await Promise.all(groups.map(
                async x => {
                    let responce = await fetch(
                        client.api.url + "/groups/" + x.id,
                        {
                            method : "GET",
                            headers: {
                                "Authorization": "Bearer " + client.api.token
                            }
                        }
                    )

                    if (! response.ok)
                        throw response
                    
                    return toGroup(await responce.json())
                }
            ))
        }
        
        return groups
    },
    self
)
