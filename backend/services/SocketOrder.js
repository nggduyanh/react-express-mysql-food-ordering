function orderSocket (socket)
{
    socket.on ("seller_connect", (sellerId) => {
        socket.join (sellerId)
    })

    socket.on ("send_order", (order,sellerId) => {
        socket.to (sellerId).emit (order)
    })

}

module.exports = orderSocket