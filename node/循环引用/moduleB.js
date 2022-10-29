module.exports.test = 'b'

const A = require('./moduleA')

console.log('moduleA: ' + A.test)

module.exports.test = 'bb'