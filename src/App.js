import React, {Component} from 'react';
import TodoStore from "./stores/TodoStore"
import SavedTodosStore from "./stores/SavedTodosStore"
import TodoList from "./components/TodoList"
import SavedTodos from "./components/SavedTodos"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';

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
        return ( <MuiThemeProvider theme={theme}>
          <SavedTodos store={SavedTodosStore} todoList={TodoStore}/>            
          <TodoList store={TodoStore} savedTodos={SavedTodosStore} />            
        </MuiThemeProvider>);
    }
}

export default App ;