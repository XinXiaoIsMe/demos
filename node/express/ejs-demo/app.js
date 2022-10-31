const path = require('path')

const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Ejs Test',
    list: ['桌子', '椅子', '袜子']
  })
})

app.listen(3000)
