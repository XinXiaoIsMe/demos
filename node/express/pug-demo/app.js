const path = require('path')

const express = require('express')

const app = express()

// 设置路由
const router = require('./router/index')
app.use(router)

// 使用pug模版
app.set('view engine', 'pug') // 设置模版引擎为pug
app.set('views', path.join(__dirname, 'views')) // 设置模版存放的文件夹，注意要使用绝对路径

app.listen(3000)
