module.exports = ({
    location,
    locationDescriptor
}) => {
    let {
        pathname = "",
        query = {}
    } = locationDescriptor instanceof Object ? locationDescriptor
      :                                        {pathname: locationDescriptor};

    return (
        pathname == location.pathname
     && Object.keys(query).every(i => query[i] == location.query[i])
    )
}
