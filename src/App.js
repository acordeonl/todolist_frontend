import React, {Component} from 'react';
import TodoStore from "./stores/TodoStore"
import SavedTodosStore from "./stores/SavedTodosStore"
import TodoList from "./components/TodoList"
import SavedTodos from "./components/SavedTodos"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Provider } from 'mobx-react'

const theme = createMuiTheme({
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
        return (<Provider savedTodosStore={ SavedTodosStore } todoStore={ TodoStore } >
          <MuiThemeProvider theme={ theme }>
            <SavedTodos />            
            <TodoList  />           
          </MuiThemeProvider>
        </Provider>);
    }
}

export default App ;