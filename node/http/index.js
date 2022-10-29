const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const { url, method } = req

  if (url === '/form' && method === 'POST') {
    const body = []
    req.on('data', chunk => {
      body.push(chunk)
    })
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString()
      const value = parseBody.split('=')[1]
      fs.writeFileSync('data.txt', value)
    })
    res.statusCode = 304
    res.setHeader('Location', '/') // 重定向
    return res.end()
  }

  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>Http Test</title></head>')
  res.write('<body><form method="POST" action="form"><input name="msg" type="text" /><input type="submit" /></form></body>')
  res.write('</html>')
  res.end()
})

server.listen(3000)
