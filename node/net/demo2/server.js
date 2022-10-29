const net = require('net')
const server = net.createServer()
const globalConf = require('./conf')
const fs = require('fs')
const path = require('path')

server.listen(globalConf.port, '127.0.0.1')
server.on('listening', () => {
  console.log('[note]: server is start...')
})
server.on('connection', socket => {
  console.log('[note]: new connection...')
  socket.on('data', data => {
    const url = data.toString().split('\n')[0].split(' ')[1]
    try {
      const fileData = fs.readFileSync(path.join(__dirname, globalConf.path, url))
      socket.write('HTTP 200OK\nContext-Type: text/html\n\n')
      socket.write(fileData) // 注意这里需要直接写进去，不能转成字符串，因为图片不是字符串
    } catch (e) {
      const lostPage = fs.readFileSync(path.join(__dirname, globalConf.path, '/404.html'))
      socket.write('HTTP 200OK\n\n' + lostPage)
    }
    socket.end()
  })
})