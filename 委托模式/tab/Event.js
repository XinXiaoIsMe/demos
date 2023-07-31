import Log from './Log.js'

class Event extends Log {
  constructor () {
    super()
    this.events = {}
  }

  on (eventName, cb) {
    this.events[eventName]
      ? this.events[eventName].push(cb)
      : (this.events[eventName] = [ cb ])
  }

  emit (eventName, ...args) {
    this.events[eventName] && this.events[eventName].forEach(cb => cb(...args))
  }

  off (eventName, cb) {
    this.events[eventName] && (this.events[eventName] = this.events[eventName].filter(eventCb => eventCb !== cb))
  }

  clear (eventName) {
    this.events[eventName] && (this.events[eventName] = [])
  }
}

export default Event
