// client
// const socket = io('ws://127.0.0.1:5432')

// // send a message to the server
// socket.emit('hello from client', 5, '6', { 7: Uint8Array.from([8]) })

// // receive a message from the server
// socket.on('hello from server', (...args: any[]) => {
//   // ...
//   console.log(args)
// })
// server
// export const socketServer = io => {
//   io.on('connection', socket => {
//     console.log('连接成功')
//     // send a message to the client
//     socket.emit('hello from server', 1, '2', { 3: Buffer.from([4]) })

//     // receive a message from the client
//     socket.on('hello from client', (...args) => {
//       console.log(args)
//       // ...
//     })
//   })
// }
export const socketServer = io => {
  let userList = new Map()
  io.on('connection', socket => {
    console.log('连接成功')
    // 监听加入用户加入
    socket.on('join', e => {
      userList.set(socket.id, e)
      // 加入成功后返回加入成功的事件
      socket.emit('joined', e)
      // 触发广播
      socket.broadcast.emit('welcome', {
        name: e.name,
        number: userList.size,
      })
      // 自己展示加入的信息
      socket.emit('welcome', {
        ...e,
        id: socket.id,
        number: userList.size,
      })
    })

    // 监听消息发送
    socket.on('send', e => {
      // 接受到消息给他广播出去
      socket.broadcast.emit('message', e)
    })
  })
}
