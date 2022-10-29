const net = require('net')

const socket = net.connect(12306, '127.0.0.1')

socket.on('connect', err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('[client]: connect success!')
  socket.write('hello, I am client~')
})

socket.on('data', data => {
  console.log('[server]: ' + data.toString())
})
