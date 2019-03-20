import React, {Component} from 'react';
import TodoListStore from "./stores/TodoListStore"
import SavedTodosStore from "./stores/SavedTodosStore"
import TodoList from "./components/TodoList"
import SavedTodos from "./components/SavedTodos"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Provider } from 'mobx-react'
import theme from './styles/theme'

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
        margin-top: 8vh;
        display: flex;
        justify-content: center;
      }
    `}</style>
  </div>
)

export default App ;