import { computed, observable, action, toJS } from "mobx"

class TodoList {
  @observable title
  @observable id

  constructor(id, title, tags, todos) {
    this.id = id
    this.title = title
    this.tags = tags
    this.todos = todos
  }
}

export class SavedTodosStore {
  @observable savedTodos = []

  @computed get tagList() {
    return this.tags.split(' ')
  }

  @action loadSavedTodos = (todoLists) => {
    this.savedTodos = [...todoLists]
  }

  @action getTodoListByid = (id) => {
    let todoLists = (toJS(this.savedTodos));
    for(let i = 0 ; i < todoLists.length ; i ++ ){
      if(todoLists[i].id === id)
        return todoLists[i]
    }
    return []
  }

  @action saveTodoList = () => {
    console.log(toJS(this.savedTodos))
  }

  @action createTodoList = (title, tags) => {
    this.savedTodos.push(new TodoList(title, tags))
  }

  @action deleteTodoList = (id) => {
    this.savedTodos = this.savedTodos.filter(todoList => todoList.id !== id)
  }
}

export default new SavedTodosStore

