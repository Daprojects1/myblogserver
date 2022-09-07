const http = require('http')
const app = require('./app')
const server = http.createServer(app)

const { API_PORT} = process.env
const port = process.env.PORT || API_PORT 


if (process.env.NODE__ENV === 'production') {
    
}
server.listen(port, () => {
    console.log(`server is listening at port ${port}`)
})