import config from './config'


export const login = async (email, password) => {
  let body = {
    email,
    password
  }
  let res = await (await fetch(`${config.backendUrl}/v1/users/auth/emailLogin`, {
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
  let res = await (await fetch(`${config.backendUrl}/v1/users/auth/signUp`, {
    method: 'post',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })).json()
  return res
}