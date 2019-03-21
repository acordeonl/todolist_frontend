import config from './config'

const verifySession = () => {
  if(localStorage.getItem('jwt'))
    return true
  else 
    window.location.reload() 
}

export const getTodoLists = async () => {
  verifySession()
  let res = await (await fetch(`${config.backendUrl}/v1/todoLists/list`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
  })).json()
  return res
}

export const queryTodoLists = async ( query ) => {
  verifySession()
  let res = await (await fetch(`${config.backendUrl}/v1/todoLists/query?q=${query}`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
  })).json()
  return res
}

export const createTodoList = async (body) => {
  verifySession()
  let res = await (await fetch(`${config.backendUrl}/v1/todoLists/`, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }),
    body: JSON.stringify(body)
  })).json()
  return res
}

export const updateTodoList = async (id, body) => {
  verifySession()
  let res = await (await fetch(`${config.backendUrl}/v1/todoLists/${id}`, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }),
    body: JSON.stringify(body)
  })).json()
  return res
}

export const deleteTodoList = async (id) => {
  verifySession()
  let res = await (await fetch(`${config.backendUrl}/v1/todoLists/${id}`, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
  })).json()
  return res
}

