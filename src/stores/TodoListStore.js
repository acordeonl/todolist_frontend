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
  @observable tags = []
  @observable todos = []
  @observable filter = ''
  @observable showFilterInput = false

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
  @computed get uncompletedTodos () {
    return this.todos.filter(todo => !todo.complete)
  }

  @action  loadTodoList = ( title, tags, todos ) => {  
    this.title = title 
    this.tags = [...tags]
    this.todos = [...todos]
  }

  @action getTodoList = () => {
    return toJS(this.todos)
  }

  @action getTagList = () => {
    return toJS(this.tags)
  }

  @action clear = () => {  
    this.title = ''
    this.tags = []
    this.todos = []
    this.filter = ''
  }

  @action createTodo = (value) => {
    this.todos.push(new Todo(value))
  }

  @action addTag = (value) => {
    this.tags.push(value)
  }

  @action deleteTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  @action clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

export default new TodoListStore

