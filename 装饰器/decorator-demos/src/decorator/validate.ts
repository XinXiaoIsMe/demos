import Alert from '../components/alert'

export function validate (target: any, prop: string, desc: PropertyDescriptor): PropertyDescriptor {
  const oldFn = desc.value

  desc.value = function (gender: string) {
    const myAlert = new Alert()
    myAlert.show().then(() => oldFn.call(this, gender)).catch(_ => _)
  }

  return desc
}
