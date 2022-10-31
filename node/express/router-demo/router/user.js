const path = require('path')
const fs = require('fs')

const express = require('express')
const router = express.Router()
const rootDir = require('../utils/path')

router.get('/user', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'user.html'))
})

router.get('/user/getUser', (req, res, next) => {
  fs.readFile(path.join(rootDir, 'data', 'user.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) throw new Error(err)

    res.send(data)
  })
})

module.exports = router