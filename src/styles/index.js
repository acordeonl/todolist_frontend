/* styles.js */
import css from 'styled-jsx/css'
import theme from './theme'

// Scoped styles
export const commonStyles = css`
  button { 
      color: red; 
  }   
  .redBack{
      background-color: red ;
  }
`

export const layoutStyles = css`
  .centered {
    display: flex ;
    align-items: center ;
    justify-content: center ;
  }
  .spaceBetween {
    display: flex ;
    justify-content: space-between ;
  }
`

export const todoListStyles = css`
  .todoTextInput { 
      background-color: transparent ;
      padding:10px 15px 10px 15px ;
      border-radius: 5px ;
      font-size: 16px;
      border:none ;
      outline: none ;
      width: 300px;
  }   
  .todoTextInput:hover{
    background-color: ${theme.todoList.textInputColor} ;
  }
  .redBack{
      background-color: red ;
  }
`

// Works also with default exports
// export default css`div { color: green; }`