import React from "react"
import { observer , inject } from "mobx-react"

@inject ('savedTodosStore')
@inject ('todoListStore')
@observer
export default class SavedTodosStore extends React.Component {
  createNew(e) {
    if (e.which === 13 && e.target.value !== '') {
      this.props.savedTodosStore.createTodoList(e.target.value)
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
      <div style={{margin:'20px'}}>
        Add todo list 
        <input  className="new"  onKeyPress={this.createNew.bind(this)} />
      </div>
    </div>)
  }
}

@inject ('todoListStore')
@inject ('savedTodosStore')
@observer
class TodoList extends React.Component { 
  render(){
    const { id , title  } = this.props 
    return (
      <li onClick={() => this.props.todoListStore.loadTodoList(id) }>
        { title }
        <button onClick={()=> this.props.savedTodosStore.deleteTodoList(id)}>delete</button>
      </li>
    )
  }
}
