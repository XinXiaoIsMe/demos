const path = require('path')

const express = require('express')
const router = express.Router()
const rootDir = require('../utils/path')

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'index.html'))
})

module.exports = router
