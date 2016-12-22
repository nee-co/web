module.exports = (file) => ({
    kind     : file["type"],
    id       : file["id"],
    name     : file["name"],
    createdAt: file["created_at"],
    createdBy: file["created_user"],
    updatedAt: file["updated_at"],
    updatedBy: file["updated_user"]
})
