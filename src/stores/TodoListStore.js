import { computed, observable, action,  toJS } from "mobx"

class Todo {
  @observable value
  @observable id
  @observable complete

  constructor(value) {
    this.value = value
    this.id = Date.now()
    this.complete = false
  }
}

export class TodoListStore {
  @observable title = ''
  @observable todos = []
  @observable filter = ''

  @computed get filteredTodos() {
    if (this.filter === '')
      return [];
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter(todo => !this.filter || (matchesFilter.test(todo.value) && !todo.completed))
  }
  @computed get completedTodos() {
    return this.todos.filter(todo => todo.complete)
  }
  @computed get progress() {
    let completedCnt = 0;
    this.todos.forEach(todo => {
      completedCnt += todo.complete
    })
    if (this.todos.length)
      return Math.round((completedCnt / this.todos.length) * 100) + '%'
    return 0 + '%';
  }
  @computed get uncompletedTodos() {
    return this.todos.filter(todo => !todo.complete)
  }

  @action  loadTodoList ( id ) {  
    if(id === 1552896827459) {
        this.title = 'probando'
        this.todos = [
          { value: "add login", id: 1552896827459, complete: false },
          { value: "add backedn ", id: 1552896830666, complete: false },
          { value: "add material ", id: 1552896838228, complete: false },
          { value: "consider styled jsx", id: 1552896845034, complete: false },
          { value: "add layout", id: 1552896849858, complete: true },
          { value: "add todo list mockup", id: 1552896856181, complete: true },
          { value: "add todo list crud", id: 1552896861010, complete: true }
        ]
      }
      else {
        this.title = 'otro'
        this.todos = [
            { value: "add login", id: 1552896827459, complete: false },
            { value: "add backedn ", id: 1552896830666, complete: false },
        ]
      }
  }

  @action getTodoList () {
    return toJS(this.todos)
  }

  @action clear () {  
    this.title = ''
    this.todos = []
    this.filter = ''
  }

  @action createTodo (value) {
    this.todos.push(new Todo(value))
  }

  @action deleteTodo (id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  @action clearComplete () {
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

export default new TodoListStore

