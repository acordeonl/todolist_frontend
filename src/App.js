import React, {Component} from 'react';
import TodoStore from "./stores/TodoStore"
import SavedTodosStore from "./stores/SavedTodosStore"
import TodoList from "./components/TodoList"
import SavedTodos from "./components/SavedTodos"


class App extends Component {
    render() {
        return ( <div>
          <SavedTodos store={SavedTodosStore} todoList={TodoStore}/>            
          <TodoList store={TodoStore} savedTodos={SavedTodosStore} />            
        </div>);
    }
}

export default App ;