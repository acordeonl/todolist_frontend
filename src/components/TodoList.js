import React from "react"
// import { common } from '../styles'
import back from './back.svg'
import { observer , inject  } from "mobx-react"

@inject ('savedTodosStore')
@inject ('todoListStore')
@observer
export default class TodoList extends React.Component {
  constructor(props) {
      super(props) ; 
      
  }
  createNew(e) {
    if (e.which === 13 && e.target.value !== '') {
      this.props.todoListStore.createTodo(e.target.value)
      this.addTodoInput = e.target 
      e.target.value = ''
    }
  }

  saveTodoList() {
    let todos = this.props.todoListStore.getTodoList() 
    console.log('--------------------------')
    console.log(this.props.todoListStore.title)
    console.log(todos)
    console.log('--------------------------')
    if(this.addTodoInput)
        this.addTodoInput.value = ''
    let { title , labels } = this.props.todoListStore
    this.props.savedTodosStore.createTodoList(title? title : 'Untitled todo list' , labels )
    this.props.todoListStore.clear() 
  }

  render() {
    const { progress , filter, title , filteredTodos, uncompletedTodos, completedTodos } = this.props.todoListStore ;
    return (<div>
      <h1>todos</h1>
      <div>
        title
        <input value={title} onChange={evt => this.props.todoListStore.title = evt.target.value} />
        {title}
      </div>
      <div style={{marginTop:'30px'}}>
        Search
        <input value={filter} onChange={evt => this.props.todoListStore.filter = evt.target.value} />
      </div>
    
      {progress}
      
      {filter && <div>
        {filteredTodos.length > 0 ? <div>
          {filteredTodos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div> : <div> No results </div>}
      </div>}
     
      {!filter && <div>
        {uncompletedTodos.length > 0 && <div>
          <div>To do </div>
          {uncompletedTodos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
          </div>}
        {completedTodos.length > 0 && <div>
          <div> Done </div>
          {completedTodos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
          </div>}
          <div style={{margin:'20px'}}>
            Add todo
            <input  className="new"  onKeyPress={this.createNew.bind(this)} />
          </div>
      </div>}
      <img src={back}/>
      <button onClick={this.saveTodoList.bind(this)}>save</button>
      <a href="#" onClick={ this.props.todoListStore.clearComplete}>Clear Complete</a>
      <style jsx>{`
          .card{
            padding:40px
          }
      `}</style>
    </div>)
  }
}

@inject ('todoListStore')
@observer
class Todo extends React.Component { 
  render(){
    const { todo } = this.props ;
    return (
      <li >
        <input type="checkbox" onChange={()=> todo.complete = !todo.complete} value={todo.complete} checked={todo.complete} />
        <input type="text" value={todo.value} onChange={ evt => todo.value = evt.target.value } />
        <button onClick={()=> this.props.todoListStore.deleteTodo(todo.id)}>delete</button>
      </li>
    )
  }
}
