const validateHostName = hostname => {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*.myshopify.com/g;
    return hostname.match(regex) ? true : false;
}

export default validateHostName;