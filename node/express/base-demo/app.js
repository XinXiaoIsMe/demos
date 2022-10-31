// const http = require('http')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/add-project', (req, res, next) => {
  res.send('<form method="POST" action="project"><input name="msg" type="text" /><input type="submit" /></form>')
})

app.use('/project', (req, res, next) => {
  console.log(req.body)
  res.redirect('/')
})

app.use((req, res, next) => {
  res.send('<h1>Hello, express!</h1>')
})

// const server = http.createServer(app)
// server.listen(3000)
// 上面两行等同于以下
app.listen(3000)