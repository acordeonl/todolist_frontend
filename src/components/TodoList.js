import React from "react"
// import { common } from '../styles'
import back from './back.svg'
import { observer , inject  } from "mobx-react"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

@inject ('savedTodosStore')
@inject ('todoStore')
@observer
export default class TodoList extends React.Component {
  constructor(props) {
      super(props) ; 
      
  }
  createNew(e) {
    if (e.which === 13 && e.target.value !== '') {
      this.props.todoStore.createTodo(e.target.value)
      this.addTodoInput = e.target 
      e.target.value = ''
    }
  }

  saveTodoList() {
    let todos = this.props.todoStore.getTodoList() 
    console.log('--------------------------')
    console.log(this.props.todoStore.title)
    console.log(todos)
    console.log('--------------------------')
    if(this.addTodoInput)
        this.addTodoInput.value = ''
    this.props.savedTodosStore.createTodoList(this.props.todoStore.title? this.props.todoStore.title : 'Untitled todo list')
    this.props.todoStore.clear() 
  }

  render() {
    const { progress , filter, title , filteredTodos, uncompletedTodos, completedTodos } = this.props.todoStore ;
    return (<div>
      <IconButton aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      <Paper  elevation={1}>
        <div className='card'>
            proabndo
        </div>
      </Paper>
      <Input placeholder="Placeholder" />
      <h1>todos</h1>
      <div>
        title
        <input value={title} onChange={evt => this.props.todoStore.title = evt.target.value} />
        {title}
      </div>
      <div style={{marginTop:'30px'}}>
        Search
        <input value={filter} onChange={evt => this.props.todoStore.filter = evt.target.value} />
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
      <a href="#" onClick={ this.props.todoStore.clearComplete}>Clear Complete</a>
      <style jsx>{`
          .card{
            padding:40px
          }
      `}</style>
    </div>)
  }
}

@inject ('todoStore')
@observer
class Todo extends React.Component { 
  render(){
    const { todo } = this.props ;
    return (
      <li >
        <input type="checkbox" onChange={()=> todo.complete = !todo.complete} value={todo.complete} checked={todo.complete} />
        <input type="text" value={todo.value} onChange={ evt => todo.value = evt.target.value } />
        <button onClick={()=> this.props.todoStore.deleteTodo(todo.id)}>delete</button>
      </li>
    )
  }
}
