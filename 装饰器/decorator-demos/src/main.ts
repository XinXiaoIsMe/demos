import Student, { StudentOption, Gender } from './primary/Student'
import { Register } from './decorator/addRegisterTime'
import './components/alert/index.css'

const mikeInfo: StudentOption = {
  name: 'Mike',
  age: 18,
  gender: Gender.MALE
}

const mike = new Student(mikeInfo) as Student & Register
mike.changeSex(Gender.FEMALE)
console.log('mike', Student.isMale(mike), mike, mike.getRetisterTime(), mike.info)
