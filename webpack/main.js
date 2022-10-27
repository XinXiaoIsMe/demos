import './src/css/common.css'
import './src/vss/test.vss'
import TodoList from './src/js/Todolist'

const todoList = new TodoList({
  container: '#app',
  data: []
})

console.log('todolist', todoList)