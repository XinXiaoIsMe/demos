const net = require('net')
const server = net.createServer()
server.listen(8080, '127.0.0.1')
server.on('listening', err => {
  if (err) {
    console.log('[Error]: ', err)
    return
  }

  console.log('[Server]: listening...')
})
server.on('connection', socket => {
  console.log('[Server]: new connection...')
  socket.write(`HTTP 200OK\r\nContent-Type: text/html\r\n\r\n<html><body>Hello, browser!</body></html>`)
  socket.on('data', data => {
    console.log('data', data.toString())
  })
  socket.end()
})