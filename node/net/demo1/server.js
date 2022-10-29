const net = require('net')

const server = net.createServer()
server.listen(12306, '127.0.0.1')
server.on('listening', err => {
  if (err) {
    console.log('[Error]: ' + err)
    return
  }
  
  console.log('[server]: listening...')
})
server.on('connection', socket => {
  console.log('[server]: connection! ')
  socket.on('data', data => {
    console.log('[client]: ' + data.toString())
    socket.write('Hi, I am server~')
  })
})
