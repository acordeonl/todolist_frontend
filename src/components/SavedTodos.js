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
      <div>
        Search
        <input onChange={console.log('hey')} />
      </div>
    
      {savedTodos.map(todoList => (
        <TodoList key={todoList.id} todoList={todoList} />
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
    const { id , title , tags } = this.props.todoList 
    return (
      <li onClick={() => this.props.todoListStore.loadTodoList(id) }>
        { title }
        <button onClick={()=> this.props.savedTodosStore.deleteTodoList(id)}>delete</button>
        {tags}
      </li>
    )
  }
}
