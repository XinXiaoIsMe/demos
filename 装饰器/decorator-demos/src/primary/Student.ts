import { validate } from '../decorator/validate'
import { formatInfo } from '../decorator/format'
import { log } from '../decorator/log'
import { addRegisterTime } from '../decorator/addRegisterTime'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export interface StudentOption {
  name: string;
  age: number;
  gender: Gender;
}

@addRegisterTime
export default class Student {
  private name: string;
  private age: number;
  private gender: Gender;
  @formatInfo
  public info: string = '';

  constructor (studentOption: StudentOption) {
    this.name = studentOption.name
    this.age = studentOption.age
    this.gender = studentOption.gender
  }

  @validate
  changeSex (gender: Gender) {
    this.gender = gender
  }

  @log
  static isMale (student: Student): boolean {
    return student.gender === Gender.MALE
  }
}