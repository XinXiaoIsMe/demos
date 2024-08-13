export default class TodoList {
  #todoList = [];
  constructor (todoList = []) {
    this.#todoList = todoList;
    this.#init();
  }

  #init () {
    this.#render();
    this.#bindEvent();
  }

  #render () {

  }

  #bindEvent () {

  }

  addTodo () {}
}