const rTime = (message) => {
    const msg = message.split(' ')
    const msgLength = msg?.length / 200
    
    if (msgLength < 1) return "Less than 1 minuite read"
    if (msgLength > 1 && msgLength < 1.5) return '1 minute read'
    if (msgLength > 1.5 && msgLength < 2.5) return "2 minute read"
    if (msgLength > 2.5) return '3 minute read'
    return "4 minuite read"
}

module.exports = rTime