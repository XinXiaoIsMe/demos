const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parser body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 配置静态文件访问
app.use(express.static(path.join(__dirname, 'views', 'static')))

// 引入路由
const {
  indexRouter,
  userRouter,
  productRouter
} = require('./router')
const rootDir = require('./utils/path')
app.use(indexRouter)
app.use(userRouter)
app.use('/product', productRouter)

// 添加404页面，利用use不加路径，默认为 "/"，而且从头开始匹配的特性
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

// 设置跨域，注意要放在所有路由的后面
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By','3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8');
  next()
})

app.listen(3000)
