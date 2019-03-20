import React from "react"
import { observer , inject } from "mobx-react"
import DeleteIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { layoutStyles } from '../styles'
import theme from '../styles/theme'


@inject ('savedTodosStore')
@inject ('todoListStore')
@observer
export default class SavedTodosStore extends React.Component {
  addTodoList() {
    this.props.savedTodosStore.createTodoList('Untitled todo list fda fasdfdas fasd fasfdsa fasdfadsfsadf', [])
  }
  render() {
    const { savedTodos } = this.props.savedTodosStore 
    return (<div className='centeredVertical'>
      <div className='centered searchInput'>
        <Input style={{opacity:'0.7'}} placeholder='Search'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon style={{opacity:'0.6'}}/>
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
            color:white ;
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
    const { id , title  } = this.props.todoList 
    return ( <div onClick={() => this.props.todoListStore.loadTodoList(id) }>
      <div className='card'>
        <div className='spaceBetween top'>
          <div className='title'>
            { title }
          </div>
          <div className='deleteIcon'>
            <IconButton onClick={()=> this.props.savedTodosStore.deleteTodoList(id)}  size='small' >
              <DeleteIcon style={{color:'white', opacity:'0.7'}} fontSize='small' />
            </IconButton>
          </div>
        </div>
      </div>
      <style jsx>{layoutStyles}</style>
      <style jsx>{`
          .title{
            padding:9px 0 9px 5px;
            color:white;
            font-size: 20px;
            float:left ;
            word-wrap: break-word;
            width: 80% ;
          }
          .card{
            padding:8px 3px 8px 15px;
            border-radius: 5px; 
            margin:15px;
            background-color: #80cbc4;
            user-select:none ;
          }
          .card:hover{
            cursor:pointer ;
            opacity: 0.8 ;
          }
      `}</style>
    </div>)
  }
}
