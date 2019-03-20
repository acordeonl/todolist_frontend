import React from "react"
import { observer , inject } from "mobx-react"
import DeleteIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { layoutStyles } from '../styles'
import { createTodoList, deleteTodoList } from '../services/todoLists'
import { renderTodoList, refreshData } from '../services/render'
import theme from '../styles/theme'


@inject ('savedTodosStore')
@inject ('todoListStore')
@observer
export default class SavedTodosStore extends React.Component {
  async addTodoList() {
    let res = await createTodoList({
      title:"Untitled todo list",
      tags:"",
      todos:"[]"
    })
    if(res.payload) {
      refreshData()
    }
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
      {savedTodos.map((todoList,index) => (
        <TodoList key={index} todoList={todoList} />
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
  async deleteTodoList(id) {
    console.log(id);
    let res = await deleteTodoList(id)
    console.log(res);
    if(res.dev_message === "Deleted rows: 1") {
      refreshData()
    }
  }
  render(){
    const { id , title  } = this.props.todoList 
    return ( <div onClick={()=>{renderTodoList(id)}}>
      <div className='card'>
        <div className='spaceBetween top'>
          <div className='title'>
            { title }
          </div>
          <div className='deleteIcon'>
            <IconButton onClick={this.deleteTodoList.bind(this , id)}  size='small' >
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
