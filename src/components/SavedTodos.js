import React from "react"
import { observer } from "mobx-react"

@observer
export default class SavedTodosStore extends React.Component {
  createNew(e) {
    if (e.which === 13 && e.target.value !== '') {
      this.props.store.createTodo(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    const { store } = this.props ; 
    const { savedTodos } = store ;
    return (<div>
      <h1>Saved Todos </h1>
      <div>
        Search
        <input onChange={console.log('hey')} />
      </div>
    
      {savedTodos.map(todoList => (
        <TodoList store={store} key={todoList.id} title={todoList.title} id={todoList.id} />
      ))}

      <button onClick={this.props.todoList.loadTodoList}>loadTodoList</button>
    </div>)
  }
}

@observer
class TodoList extends React.Component { 
  render(){
    const { id , title , store } = this.props ;
    return (
      <li >
        { title }
        <button onClick={()=>store.deleteTodoList(id)}>delete</button>
      </li>
    )
  }
}
