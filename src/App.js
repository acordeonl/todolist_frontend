import React, { Component } from 'react';
import TodoListStore from "./stores/TodoListStore"
import SavedTodosStore from "./stores/SavedTodosStore"
import TodoList from "./components/TodoList"
import SavedTodos from "./components/SavedTodos"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Provider } from 'mobx-react'
import theme from './styles/theme'
import { refreshData } from './services/render'
import Auth from './components/auth'

const MuiTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal,
  },
  typography: {
    useNextVariants: true,
  },
  status: {
    danger: 'orange',
  },
});


class App extends Component {
  async componentDidMount() {
    if (localStorage.getItem('jwt'))
      await refreshData()
  }
  render() {
    return (<Provider savedTodosStore={SavedTodosStore} todoListStore={TodoListStore} >
      <MuiThemeProvider theme={MuiTheme}>
        <Main />
      </MuiThemeProvider>
    </Provider>);
  }
}

const Main = () => (<div>
  <div>
    <Header />
  </div>
  <div className='wrapper'>
    {localStorage.getItem('jwt') ?
      <div className='subWrapper'>
        <div className='savedTodos'>
          <SavedTodos />
        </div>
        <div className='todoList'>
          <TodoList />
        </div>
      </div> :
      <div>
        <Auth />
      </div>
    }

    <style jsx>{`
      .todoList{
        width:500px;
        border-bottom-right-radius:  12px;
        border-top-right-radius:  12px;
        background: ${theme.todoList.backgroundColor} ;
        overflow-y: auto ;
        box-shadow: 0 2px 4px 0 rgba(130, 130, 130, 0.5) ;
      }
      .savedTodos{
        width: 300px;
        border-bottom-left-radius:  12px;
        border-top-left-radius:  12px;
        background-color: ${theme.savedTodos.backgroundColor} ;
        overflow-y: auto ;
      }
      .subWrapper{
        box-shadow: rgba(0, 0, 0, 0.3) 1px 3px 10px -3px ;
        display: flex ;
        border-radius: 12px;
        height: 75vh;
      }
      .wrapper{
        width:100%;
        display: flex;
        justify-content: center;
      }
    `}</style>
  </div>
</div>)

class Header extends React.Component {
  logOut() {
    localStorage.removeItem('jwt')
    window.location.reload()
  }
  render() {
    return (<div className='wrapper'>
      <div className='button'>
        {localStorage.getItem('jwt') && <div>
          <Button onClick={this.logOut.bind(this)} color='primary' size='large' variant='contained'>
            LOG OUT
          </Button> 
        </div>}
      </div>
      <style jsx>{`
        .button{
          opacity:0.6;
        }
        .button:hover{
          opacity:0.8 ;
        }
        .wrapper{
          float:right ;
          margin-bottom:2vh ;
          padding:20px 50px 20px 50px ;
        }
      `}</style>
    </div>)
  }
}

export default App;