import { computed, observable , action , toJS } from "mobx"

class TodoList {
  @observable title
  @observable id
  @observable tags

  constructor(title , tags) {
    this.id = Date.now()
    this.title = title
    this.tags = ""
  }
}

export class SavedTodosStore {
  @observable savedTodos = [{
    title:'probando',
    tags:'testing otravaina hey',
    id: 1552896827459
  }]

  @computed get getTags() {
    return tags.split(' ')
  }

  @action saveTodoList () { 
    console.log(toJS(this.savedTodos))
  }

  @action createTodoList (title , tags) {
    this.savedTodos.push(new TodoList(title , tags))
  }

  @action deleteTodoList (id) {
    this.savedTodos = this.savedTodos.filter(todoList => todoList.id !== id )
  }
}

export default new SavedTodosStore

