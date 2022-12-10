import Transfer from './Transfer/Transfer'

const components = {
  Transfer
}

export {
  Transfer
}

export default {
  install (app) {
    for (const componentName in components) {
      app.component(componentName, components[componentName])
    }
  }
}
