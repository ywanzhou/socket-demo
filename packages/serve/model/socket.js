export const socketServer = io => {
  let userList = new Map()
  io.on('connection', socket => {
    // 监听加入用户加入
    socket.on('join', e => {
      userList.set(socket.id, e)
      // 加入成功后返回加入成功的事件
      socket.emit('joined', Object.assign({}, e, { id: socket.id }))
      const uList = [...userList.entries()]
      // 触发广播
      socket.broadcast.emit('welcome', {
        ...e,
        uList,
      })
      // 自己展示加入的信息
      socket.emit('welcome', {
        ...e,
        uList,
      })
    })

    // 监听消息发送
    socket.on('send', e => {
      // 接受到消息给他广播出去
      socket.broadcast.emit('message', e)
    })

    // 监听私聊消息的发送
    socket.on('send-user', e => {
      const sendUserId = e.sendUserId
      socket.to(sendUserId).emit('message-user', e)
    })
    // 用户离开
    socket.on('disconnecting', () => {
      const bool = userList.delete(socket.id)
      // 如果有用户离开，在进行广播（因为只打开页面不进入关闭页面也会触发这个事件）
      bool && socket.broadcast.emit('quit', socket.id)
    })
  })
}
