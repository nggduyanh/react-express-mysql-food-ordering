const order = require ("./SocketOrder")
function socketEvent (io)
{
    io.on ("connection", socket => {
        order (socket)

    })
}

module.exports = socketEvent