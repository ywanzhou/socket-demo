export const socketServer = io => {
  io.on('connection', socket => {
    console.log('连接成功')
    // send a message to the client
    socket.emit('hello from server', 1, '2', { 3: Buffer.from([4]) })

    // receive a message from the client
    socket.on('hello from client', (...args) => {
      console.log(args)
      // ...
    })
  })
}
