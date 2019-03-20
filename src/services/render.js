import SavedTodosStore from "../stores/SavedTodosStore"
import TodoListStore from "../stores/TodoListStore"

export const renderTodoList = async (id) => {
  let todoList = SavedTodosStore.getTodoListByid(id)
  let tags = []
  if (todoList.tags !== '')
    tags = todoList.tags.split(' ')
  let todos = JSON.parse(todoList.todos)
  TodoListStore.loadTodoList(todoList.title, tags, todos)
}