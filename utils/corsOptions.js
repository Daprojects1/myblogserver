const whiteList = ['https://blogscity.herokuapp.com', 'http://localhost:5050', 'http://localhost:3000', ]

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