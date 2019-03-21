import SavedTodosStore from '../stores/SavedTodosStore'
import TodoListStore from '../stores/TodoListStore'
import { getTodoLists, queryTodoLists } from './todoLists'

export const refreshData = async (query) => {
  let res
  if (query)
    res = await queryTodoLists(query)
  else
    res = await getTodoLists()
  SavedTodosStore.loadSavedTodos(res.payload)
  if(res.payload.length > 0) {
    let tags = []
    if (res.payload[0].tags !== '')
      tags = res.payload[0].tags.split(',')
    let todos = JSON.parse(res.payload[0].todos)
    SavedTodosStore.selectedTodoListId = res.payload[0].id
    TodoListStore.loadTodoList(res.payload[0].title, tags, todos)
  }
}

export const renderTodoList = async (id) => {
  let todoList = SavedTodosStore.getTodoListByid(id)
  SavedTodosStore.selectedTodoListId = id
  let tags = []
  if (todoList.tags !== '')
    tags = todoList.tags.split(',')
  let todos = JSON.parse(todoList.todos)
  TodoListStore.loadTodoList(todoList.title, tags, todos)
}