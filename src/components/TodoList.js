import React from "react"
import { todoListStyles , layoutStyles } from '../styles'
import { observer, inject } from "mobx-react"
import theme from '../styles/theme'
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Clear';

export default () => (
  <div >
    <div className='header'>
      <Header />
    </div>
    <div className='todos'>
      <Todos />
    </div>
    <style jsx>{`
        .todos{
          background-color: ${theme.todoList.backgroundColor} ;
          padding: 10px 50px 50px 50px ;
          border-bottom-right-radius: 5px;
        }
        .header{
          background-color: royalblue;
        }
    `}</style>
  </div>
)

@inject('savedTodosStore')
@inject('todoListStore')
@observer
class Header extends React.Component {
  saveTodoList() {
    let todos = this.props.todoListStore.getTodoList()
    console.log('--------------------------')
    console.log(this.props.todoListStore.title)
    console.log(todos)
    console.log('--------------------------')
    if (this.addTodoInput)
      this.addTodoInput.value = ''
    let { title, tags } = this.props.todoListStore
    this.props.savedTodosStore.createTodoList(title ? title : 'Untitled todo list', tags)
    this.props.todoListStore.clear()
  }
  render() {
    let { progress, filter, title, tags } = this.props.todoListStore
    return (
      <div>
        <button onClick={this.saveTodoList.bind(this)}>save</button>
        <div>
          title
          <input value={title} onChange={evt => this.props.todoListStore.title = evt.target.value} />
          {title}
        </div>
        <div>
          tags
          <input value={tags} onChange={evt => this.props.todoListStore.tags = evt.target.value} />
          {tags}
        </div>
        <div className='progress' />
        <div className='filter'>
          Search
          <input value={filter} onChange={evt => this.props.todoListStore.filter = evt.target.value} />
        </div>
        <button onClick={this.props.todoListStore.clearComplete}>Clear Complete</button>
        <style jsx>{`
          .filter{
            background-color: purple;
          }
          .progress{
              background-color: ${theme.todoList.progressBarColor};
              height:10px;
              width:${progress};
            }
        `}</style>
      </div>
    )
  }
}


@inject('savedTodosStore')
@inject('todoListStore')
@observer
class Todos extends React.Component {
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

  render() {
    const { filter, filteredTodos, uncompletedTodos, completedTodos } = this.props.todoListStore;
    return (<div >
      <div >
        <div style={{margin:'15px 0 7px 0'}} className='centered' >
          <Checkbox style={{visibility:'hidden'}} />
          <input onBlur={(evt) => { evt.target.value = ''}} placeholder='Add todo' className='todoTextInput addTodo' onKeyPress={this.createNew.bind(this)} />
          <IconButton style={{visibility:'hidden'}} size='small' >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </div>
        {filter && <div>
            {filteredTodos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
        </div>}
        
        { ((filter && filteredTodos.length === 0) || 
          (uncompletedTodos.length === 0 && completedTodos.length === 0) ) && 
          <div className='noTodos centered'> No todos </div> }

        {!filter && <div >
          {uncompletedTodos.length > 0 && <div>
            <div className='header'> To do </div>
            {uncompletedTodos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>}
          {completedTodos.length > 0 && <div>
            <div className='header'> Done </div>
            {completedTodos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>}
        </div>}
      </div>
      <style jsx>{layoutStyles}</style>
      <style jsx>{todoListStyles}</style>
      <style jsx>{`
        .header{
          user-select: none;
          padding:8px ;
          border-radius: 5px ;
          font-size: 20px ;
          color:gray ;
        }
        .noTodos{
          user-select: none ;
          margin-top: 90px;
          font-size: 20px ;
          opacity: 0.7;
        }
        .addTodo{
          background-color: ${theme.todoList.textInputColor}
        }
      `}</style>
    </div>)
  }
}

@inject('todoListStore')
@observer
class Todo extends React.Component {
  render() {
    const { todo } = this.props;
    return ( <div className='wrapper centered'>
        <Checkbox onChange={() => todo.complete = !todo.complete} checked={todo.complete}/>
        <input className='todoTextInput' value={todo.value} onChange={evt => todo.value = evt.target.value} />
        <IconButton size='small' onClick={() => this.props.todoListStore.deleteTodo(todo.id)} >
          <DeleteIcon fontSize='small' />
        </IconButton>
        <style jsx>{todoListStyles}</style>
        <style jsx>{layoutStyles}</style>
        <style jsx>{`
            .wrapper{
              margin-top:2px;
              margin-bottom: 2px; 
              border-radius: 7px ;
            }
        `}</style>
    </div>)
  }
}
