const whiteList = ['https://yoursite.com', 'http://127.0.0.1:5500', 'https://localhost:3000']

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
            return
        }
        callback(new Error('Not allowed by CORS'))
    },
    optionsSuccessStatus:200
}

module.exports = corsOptions