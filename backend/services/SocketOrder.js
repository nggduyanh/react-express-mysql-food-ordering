function orderSocket(socket) {
  socket.on("seller_connect", (sellerId) => {
    console.log("sellerId", sellerId);
    socket.join(sellerId);
  });

  socket.on("send_order", (order, sellerId) => {
    console.log("sellerId", sellerId);
    console.log("order", order);
    socket.to(sellerId).emit("receive_order", order);
  });
}

module.exports = orderSocket;
