const fs = require('fs')
const data = fs.readFileSync('./server.conf').toString().split('\n')
const globalConf = {}

data.forEach(config => {
  const [key, value] = config.split('=')
  globalConf[key] = value
})

module.exports = globalConf