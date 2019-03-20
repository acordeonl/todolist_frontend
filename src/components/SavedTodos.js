import React from "react"
import { observer , inject } from "mobx-react"
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { layoutStyles } from '../styles'


@inject ('savedTodosStore')
@inject ('todoListStore')
@observer
export default class SavedTodosStore extends React.Component {
  addTodoList() {
    this.props.savedTodosStore.createTodoList('Untitled todo list', [])
  }
  render() {
    const { savedTodos } = this.props.savedTodosStore 
    return (<div className='centeredVertical'>
      <div className='centered searchInput'>
        <Input placeholder='Search'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon style={{opacity:'0.4'}}/>
            </InputAdornment>
          }
        />
      </div>
      <div className='centered' style={{margin:'20px'}}>
        <Button variant="contained" color="primary" onClick={this.addTodoList.bind(this)} >
          New todo list
        </Button>
      </div>
      {savedTodos.map(todoList => (
        <TodoList key={todoList.id} todoList={todoList} />
      ))}
      <style jsx>{layoutStyles}</style>
      <style jsx>{`
          .searchInput{
            margin-top: 20px;
          }
      `}</style>
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
