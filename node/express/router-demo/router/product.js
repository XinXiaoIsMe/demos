const path = require('path')
const fs = require('fs')

const express = require('express')
const router = express.Router()
const rootDir = require('../utils/path')

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'product.html'))
})

router.get('/getProduct', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'data', 'product.json'))
})

router.post('/addProduct', (req, res, next) => {
  update(res, function (data) {
    const productData = data
    const newProductData = {
      name: req.body.name,
      price: parseFloat(req.body.price).toFixed(2),
      id: new Date().getTime() + ''
    }
    productData.push(newProductData)
    return productData
  })
})

router.post('/deleteProduct', (req, res, next) => {
  const id = req.body.id
  update(res, function (data) {
    return data.filter(item => String(item.id) !== String(id))
  })
})

function update (res, cb) {
  fs.readFile(path.join(rootDir, 'data', 'product.json'), { encoding: 'utf8' }, function (err, data) {
    if (err) {
      throw new Error(err)
    }

    const _data = JSON.parse(data)
    const newData = JSON.stringify(cb(_data))

    fs.writeFile(path.join(rootDir, 'data', 'product.json'), newData, function (err) {
      if (err) {
        res.status(500).send(JSON.stringify({
          code: 500,
          status: 'error',
          msg: 'failed!'
        }))
        return
      }
      res.send(JSON.stringify({
        code: 200,
        status: 'ok',
        msg: 'success!'
      }))
      return
    })
  })
}

module.exports = router
