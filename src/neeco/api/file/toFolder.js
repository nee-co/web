module.exports = (folder) => ({
    id       : folder["id"],
    name     : folder["name"],
    createdAt: folder["created_at"],
    createdBy: folder["created_user"],
    updatedAt: folder["updated_at"],
    updatedBy: folder["updated_user"]
})
