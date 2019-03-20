import React, {Component} from 'react';
import TodoListStore from "./stores/TodoListStore"
import SavedTodosStore from "./stores/SavedTodosStore"
import TodoList from "./components/TodoList"
import SavedTodos from "./components/SavedTodos"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Provider } from 'mobx-react'
import theme from './styles/theme'

const MuiTheme = createMuiTheme({
  palette: {
      primary: indigo,
      secondary: blueGrey,
  },
  typography: {
      useNextVariants: true,
  },
  status: {
      danger: 'orange',
  },
});


class App extends Component {
    render() {
        return (<Provider savedTodosStore={ SavedTodosStore } todoListStore={ TodoListStore } >
          <MuiThemeProvider theme={ MuiTheme }>
            <Main/>
          </MuiThemeProvider>
        </Provider>);
    }
}

const Main = () => (
  <div className='wrapper'>
    <div className='subWrapper'>
      <div className='savedTodos'>
        <SavedTodos />            
      </div>
      <div className='todoList'>
        <TodoList />           
      </div>
    </div>
    <style jsx>{`
      .todoList{
        width:500px;
        background: ${theme.todoList.background} ;
        border:'solid 1px black'
      }
      .savedTodos{
        width: 200px;
        background-color: #c5edcf ;
      }
      .subWrapper{
        box-shadow: rgba(0, 0, 0, 0.3) 1px 3px 10px -3px ;
        display: flex ;
        border-radius: 5px;
        min-height: 500px;
      }
      .wrapper{
        width:100%;
        margin-top: 100px;
        display: flex;
        justify-content: center;
      }
    `}</style>
  </div>
)

export default App ;