import React from "react"
import Checkbox from '@material-ui/core/Checkbox';
// --------------- Button icon ----------------------
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import MoreIcon from '@material-ui/icons/MoreVert';
// --------------- Menu ----------------------
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
// --------------- styles ----------------------
import { todoListStyles , layoutStyles } from '../styles'
import { observer, inject } from "mobx-react"
import theme from '../styles/theme'
import { deleteTodoList } from '../services/todoLists'
import { refreshData } from '../services/render'


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
    `}</style>
  </div>
)

@inject('savedTodosStore')
@inject('todoListStore')
@observer
class Menu extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = async (event) => {
    if (this.anchorEl.contains(event.target)) {
      return
    }
    switch (event.target.id) {
      case 'clear':
        this.props.todoListStore.clearComplete()
        break
      case 'filter':
        this.props.todoListStore.showFilterInput = true
        break
      case 'delete':
        let res = await deleteTodoList(this.props.savedTodosStore.selectedTodoListId)
        if(res.dev_message === "Deleted rows: 1") 
          refreshData()
        break
      default:
        break
    }
    this.setState({ open: false })
  };
  render(){
    const { open } = this.state
    return (<div>
      <IconButton style={{opacity:'0.8'}} buttonRef={node => {
        this.anchorEl = node
      }}
      onClick={this.handleToggle}>
        <MoreIcon  />
      </IconButton>
      <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList>
                  <MenuItem id='filter' onClick={this.handleClose}>Filter todos</MenuItem>
                  <MenuItem id='clear' onClick={this.handleClose}>Clear completed</MenuItem>
                  <MenuItem id='delete' onClick={this.handleClose}>Delete todo list</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      </div>)
  }
}

@inject('savedTodosStore')
@inject('todoListStore')
@observer
class Header extends React.Component {
  saveTodoList() {
    let todos = this.props.todoListStore.getTodoList()
    let tagList = this.props.todoListStore.getTagList()
    console.log('--------------------------')
    console.log(this.props.todoListStore.title)
    console.log(todos)
    console.log('--------------------------')
    let { title } = this.props.todoListStore
    this.props.savedTodosStore.createTodoList(title ? title : 'Untitled todo list', tagList)
    this.props.todoListStore.clear()
  }
  hideFilterTodos() {
    this.filterTodos.value = ''
    this.props.todoListStore.filter = ''
    this.props.todoListStore.showFilterInput = false
  }

  addTag (e) {
    let tag = e.target.value.trim()
    if(e.which === 32) 
      e.preventDefault()
    if ((e.which === 13 || e.which === 32) &&  tag !== ' ' &&  tag !== '') {
      this.props.todoListStore.addTag(tag)
      this.addTodoInput = e.target
      e.target.value = ''
    }
  }

  render() {
    let { showFilterInput, progress, filter, title, tags } = this.props.todoListStore
    return (
      <div >
        <div style={{borderBottom:'solid 1px rgb(236, 235, 235)'}}>
          <div className='spaceBetween' style={{margin:'5 0px 0 0px'}} >
            <input className='title' placeholder='Untitled todo list' value={title} onChange={evt => this.props.todoListStore.title = evt.target.value} />
            <div className='icons'>
              <div title='Save todo list'>
                <IconButton onClick={this.saveTodoList.bind(this)} size='small' >
                  <SaveIcon style={{opacity:'0.8'}}/>
                </IconButton>
              </div>
              <Menu/>
            </div>
          </div>
          <div className='tagList'>
            {tags.map((tag,index) => (
              <div className='tag' key={index}> {tag} </div>
            ))}
            {/* <input value={tags} onChange={evt => this.props.todoListStore.tags = evt.target.value} /> */}
          </div>
          <input onKeyPress={this.addTag.bind(this)} onBlur={(evt) => { evt.target.value = ''}} placeholder='add tag' className='tagInput'  />
        </div>
        {showFilterInput && <div >
          <div className='centered' style={{borderBottom:'solid 1px rgb(236, 235, 235)'}}> 
            <input ref={(input) => { this.filterTodos = input}} 
              placeholder='Filter todos'
              className='filterInput' value={filter} 
              onChange={evt => this.props.todoListStore.filter = evt.target.value} />
            <Button color='primary' size='small' onClick={this.hideFilterTodos.bind(this)} >
              Hide
            </Button>
          </div>
        </div>}
        <div className='progress' />
        <style jsx>{layoutStyles}</style>
        <style jsx>{`
          .tagInput{
            border:none;
            padding: 0px 5px 10px 30px;
            outline:none;
            opacity: 0.6 ;
          }
          .icons{
            margin: 5px 10px 5px 15px;
            display: flex ;
          }
          .tagList{
            margin:0px 30px 10px 30px;
            word-wrap: break-word;
            line-height: 2.2;
          }
          .tag{
            display: inline ;
            background-color: ${theme.todoList.progressBarColor};
            opacity: 0.6 ;
            padding:5px 15px 5px 15px;
            margin:10px 5px 0px 5px;
            color:white;
            border-radius: 4px;
          }
          .filterInput{
            width:100% ;
            opacity: 0.8 ;
            font-size: 14px;
            outline: none ;
            border:none ;
            padding: 8px 30px 8px 50px; 
          }
          .title{
            outline:none;
            border:none ;
            width:80% ;
            opacity: 0.8;
            margin:10px 0 0px 0;
            font-size: 27px ;
            padding:15px;
            padding-left:30px;
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
            {filteredTodos.map((todo,index) => (
              <Todo key={index} todo={todo} />
            ))}
        </div>}
        
        { ((filter && filteredTodos.length === 0) || 
          (uncompletedTodos.length === 0 && completedTodos.length === 0) ) && 
          <div className='noTodos centered'> No todos </div> }

        {!filter && <div >
          {uncompletedTodos.length > 0 && <div>
            <div className='header'> To do </div>
            {uncompletedTodos.map((todo,index) => (
              <Todo key={index} todo={todo} />
            ))}
          </div>}
          {completedTodos.length > 0 && <div>
            <div className='header'> Done </div>
            {completedTodos.map((todo,index) => (
              <Todo key={index} todo={todo} />
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
          <DeleteIcon fontSize='small' style={{opacity:'0.4'}} />
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
