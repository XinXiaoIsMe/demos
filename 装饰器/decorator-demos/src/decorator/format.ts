export function formatInfo (target: any, prop: string): void {
  const getter = function () {
    return 'ceshi'
  }

  Object.defineProperty(target, prop, {
    get: getter
  })
}