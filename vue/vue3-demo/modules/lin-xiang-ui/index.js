import Transfer from './Transfer/Transfer';
import Condition from './Condition';
import { Skeleton, SkeletonItem } from './Skeleton';

const components = {
  Transfer,
  Condition,
  Skeleton,
  SkeletonItem
}

export {
  Transfer,
  Condition,
  Skeleton,
  SkeletonItem
}

export default {
  install (app) {
    for (const componentName in components) {
      app.component(componentName, components[componentName])
    }
  }
}
