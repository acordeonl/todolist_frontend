import React from "react"
import { observer , inject } from "mobx-react"

@inject ('savedTodosStore')
@inject ('todoStore')
@observer
export default class SavedTodosStore extends React.Component {
  createNew(e) {
    if (e.which === 13 && e.target.value !== '') {
      this.props.savedTodosStore.createTodo(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    const { savedTodos } = this.props.savedTodosStore 
    return (<div>
      <h1>Saved Todos </h1>
      <div>
        Search
        <input onChange={console.log('hey')} />
      </div>
    
      {savedTodos.map(todoList => (
        <TodoList key={todoList.id} title={todoList.title} id={todoList.id} />
      ))}

      <button onClick={this.props.todoStore.loadTodoList}>loadTodoList</button>
    </div>)
  }
}

@inject ('savedTodosStore')
@observer
class TodoList extends React.Component { 
  render(){
    const { id , title  } = this.props 
    return (
      <li >
        { title }
        <button onClick={()=> this.props.savedTodosStore.deleteTodoList(id)}>delete</button>
      </li>
    )
  }
}
