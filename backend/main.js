const path = require ("path")
const express = require ("express")
const app = express ()
const router = require ("./routes/index")
const errorHandler = require ("./middlewares/ExceptionHandler")
// middlewares
app.use (express.urlencoded ({extended: true}))
app.use (express.json ())
app.use (express.static (path.join (__dirname,"public")))

router(app)

app.use (errorHandler)

app.listen (process.env.port, () => {
    console.log (`Đang chạy trên cổng ${process.env.port}`)
})