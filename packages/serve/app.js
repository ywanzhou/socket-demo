import express from 'express'
import { Server } from 'socket.io'
import { socketServer } from './model/socket.js'
// 开启cors跨域
const io = new Server(5432, { cors: true })

socketServer(io)
// ws 基础socket展示
// import { WebSocketServer } from 'ws'

// const server = new WebSocketServer({ port: 3289 })

// server.on('connection', socket => {
//   socket.send('web socket 连接成功')
//   socket.on('message', data => {
//     console.log(data.toString())
//   })
// })

const app = express()

// 当对主页发出 GET 请求时，响应“hello world”
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
