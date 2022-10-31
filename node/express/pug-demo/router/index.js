const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Pug Test',
    msg: 'Hello world!'
  })
})

module.exports = router
