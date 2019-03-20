import { debug } from "util";

const backendUrl = 'http://localhost:3000'

// --------------- Auth ----------------------

export const login = async (email, password) => {
  let body = {
    email,
    password
  }
  let res = await (await fetch(`${backendUrl}/v1/users/auth/emailLogin`, {
    method: 'post',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })).json()
  return res
}

export const signUp = async (email, password) => {
  let body = {
    email,
    password
  }
  let res = await (await fetch(`${backendUrl}/v1/users/auth/signUp`, {
    method: 'post',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })).json()
  return res
}

// --------------- Todo list ----------------------

export const getTodoLists = async () => {
  let res = await (await fetch(`${backendUrl}/v1/todoLists/list`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
  })).json()
  return res
}

export const createTodoList = async ( body ) => {
  let res = await (await fetch(`${backendUrl}/v1/todoLists/`, {
    method: 'post',
    headers: new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }),
    body: JSON.stringify(body)
  })).json()
  return res
}

export const updateTodoList = async ( id, body ) => {
  let res = await (await fetch(`${backendUrl}/v1/todoLists/${id}`, {
    method: 'put',
    headers: new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }),
    body: JSON.stringify(body)
  })).json()
  return res
}

export const deleteTodoList = async ( id ) => {
  let res = await (await fetch(`${backendUrl}/v1/todoLists/${id}`, {
    method: 'delete',
    headers: new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
  })).json()
  return res
}

