const getPreview = (message) => {
    return `${message.substring(0,80)}...`
}

module.exports = getPreview