const getPreview = (message) => {
    console.log(message.split('<br>'))
    return `${message.substring(0,80)}...`
}

module.exports = getPreview