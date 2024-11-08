const path = require ("path")
const express = require ("express")
const app = express ()
const router = require ("./routes/index")
const errorHandler = require ("./middlewares/ExceptionHandler")
const cors = require ("cors")
const socket = require ("socket.io")
const http = require ("http")
const corsOption = require ("./configs/CorsConfig")

// middlewares
app.use (cors (corsOption))
app.use (express.urlencoded ({extended: true}))
app.use (express.json ())
app.use (express.static (path.join (__dirname,"public")))

router(app)

app.use (errorHandler)


const server = http.createServer (app)
const io = new socket.Server (server)
const socketEvent = require ("./services/Socket")

socketEvent (io)


server.listen (process.env.port, () => {
    console.log (`Đang chạy trên cổng ${process.env.port}`)
})