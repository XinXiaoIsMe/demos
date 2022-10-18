import Student from '../primary/Student'

export function log (target: any, prop: string, desc: PropertyDescriptor): PropertyDescriptor {
  const oldFn = desc.value

  desc.value = function (student: Student) {
    console.log(`[log]: method "${ prop }" is called.`)

    return oldFn.call(this, student)
  }

  return desc
}