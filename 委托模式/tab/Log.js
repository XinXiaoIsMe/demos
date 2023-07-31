class Log {
  constructor (types = {}) {
    this.types = Object.assign({}, {
      info: '#ccc',
      warn: 'orange',
      success: 'skyblue',
      error: 'red'
    }, types)
  }

  log (type, msg) {
    const color = this.types[type] || '#000'
    console.log(`[log]: %c${ msg }`, `color: ${ color }`)
  }
}

export default Log
