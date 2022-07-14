var express = require('express')
var app = express()

// 当对主页发出 GET 请求时，响应“hello world”
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
