import { computed, observable , action , toJS } from "mobx"

class TodoList {
  @observable title
  @observable id

  constructor(title) {
    this.title = title
    this.id = Date.now()
  }
}

export class SavedTodosStore {
  @observable savedTodos = [{
    title:'probando',
    id: 1552896827459
  }]

  @action
  saveTodoList = () => { 
    console.log(toJS(this.savedTodos))
  }

  @action
  createTodoList = (title) => {
    this.savedTodos.push(new TodoList(title))
  }

  @action
  deleteTodoList = (id) => {
    this.savedTodos = this.savedTodos.filter(todoList => todoList.id !== id )
  }

}

export default new SavedTodosStore

