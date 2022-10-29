module.exports.test = 'a'

const B = require('./moduleB')

console.log('moduleB: ' + B.test)

module.exports.test = 'aa'
