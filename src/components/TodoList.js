import React from "react"
// import { common } from '../styles'
import { observer } from "mobx-react"

@observer
export default class TodoList extends React.Component {
  constructor(props) {
      super(props) ; 
      
  }
  createNew(e) {
    if (e.which === 13 && e.target.value !== '') {
      this.props.store.createTodo(e.target.value)
      this.addTodoInput = e.target 
      e.target.value = ''
    }
  }

  saveTodoList() {
    let todos = this.props.store.getTodoList() 
    console.log('--------------------------')
    console.log(this.props.store.title)
    console.log(todos)
    console.log('--------------------------')
    if(this.addTodoInput)
        this.addTodoInput.value = ''
    this.props.savedTodos.createTodoList(this.props.store.title? this.props.store.title : 'Untitled todo list')
    this.props.store.clear() 
  }

  render() {
    const { store } = this.props ; 
    const { progress , filter, title , filteredTodos, uncompletedTodos, completedTodos } = store ;
    return (<div>
      <h1>todos</h1>
      <div>
        title
        <input value={title} onChange={evt => store.title = evt.target.value} />
        {title}
      </div>
      <div style={{marginTop:'30px'}}>
        Search
        <input value={filter} onChange={evt => store.filter = evt.target.value} />
      </div>
    
      {progress}
      
      {filter && <div>
        {filteredTodos.length > 0 ? <div>
          {filteredTodos.map(todo => (
            <Todo store={store} key={todo.id} todo={todo} />
          ))}
        </div> : <div> No results </div>}
      </div>}
     
      {!filter && <div>
        {uncompletedTodos.length > 0 && <div>
          <div>To do </div>
          {uncompletedTodos.map(todo => (
            <Todo store={store} key={todo.id} todo={todo} />
          ))}
          </div>}
        {completedTodos.length > 0 && <div>
          <div> Done </div>
          {completedTodos.map(todo => (
            <Todo store={store} key={todo.id} todo={todo} />
          ))}
          </div>}
          <div style={{margin:'20px'}}>
            Add todo
            <input  className="new"  onKeyPress={this.createNew.bind(this)} />
          </div>
      </div>}
      <button onClick={this.saveTodoList.bind(this)}>save</button>
      <a href="#" onClick={store.clearComplete}>Clear Complete</a>
    </div>)
  }
}

@observer
class Todo extends React.Component { 
  render(){
    const { todo , store } = this.props ;
    return (
      <li >
        <input type="checkbox" onChange={()=> todo.complete = !todo.complete} value={todo.complete} checked={todo.complete} />
        <input type="text" value={todo.value} onChange={ evt => todo.value = evt.target.value } />
        <button onClick={()=>store.deleteTodo(todo.id)}>delete</button>
      </li>
    )
  }
}
