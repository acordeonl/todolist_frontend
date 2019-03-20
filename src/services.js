const backendUrl = 'http://localhost:3000'

async function login () {
    let body = {
        email:'cbarraza11@gmail.com',
        password:'probando'
    }
    let response = await fetch( `${backendUrl}/v1/users/auth/emailLogin`, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(body)
    }) 
    return response
}

export { 
    login
}