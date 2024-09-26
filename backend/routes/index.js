const nguoiBanRouter = require ("./NguoiBanRoute")
function route (app)
{
    app.use ("/nguoiban",nguoiBanRouter)
}

module.exports = route