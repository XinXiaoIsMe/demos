import Transfer from './Transfer/Transfer'
import Condition from './Condition'

const components = {
  Transfer,
  Condition
}

export {
  Transfer,
  Condition
}

export default {
  install (app) {
    for (const componentName in components) {
      app.component(componentName, components[componentName])
    }
  }
}
