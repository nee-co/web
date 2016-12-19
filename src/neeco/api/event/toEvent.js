module.exports = (event) => ({
    id         : event["id"],
    title      : event["title"],
    description: event["body"],
    image      : event["image"],
    startDate  : event["start_date"],
    isPublic   : event["isPublic"],
    owner      : event["owner"],
    entries    : event["entries"],
    comments   : event["comments"]
}) 
