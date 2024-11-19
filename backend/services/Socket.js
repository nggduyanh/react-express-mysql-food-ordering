const order = require ("./SocketOrder")
function socketEvent (io)
{
    io.on ("connection", socket => {
        console.log ("a user has connected")
        order (socket)

    })
}

module.exports = socketEvent