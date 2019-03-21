import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { layoutStyles } from '../styles'
import { login , signUp } from '../services/auth'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.action = ''
  }

  async handleSubmit ( event ) {
    event.preventDefault();
    const formData = new window.FormData(event.target)
    if(this.action === 'logIn') {
      let res = await login( formData.get('email') , formData.get('password') )
      if(res.user_message === 'invalid credentials'){
        alert(res.user_message)
        return ;
      }
      localStorage.setItem('jwt' , res.access_token )
      window.location.reload()
    }
    if(this.action === 'signUp') { 
      let res = await signUp( formData.get('email') , formData.get('password') )
      if(res.err){
        alert('Please add email and password')
        return 
      }
      if(res.dev_message !== 'user created') {
        alert(res.dev_message)
        return 
      }
      let res2 = await login( formData.get('email') , formData.get('password') )
      localStorage.setItem('jwt' , res2.access_token )
      window.location.reload()
    }
  }
  render() {
    return (<div style={{marginTop:'100px'}}>
      <Paper elevation={1}>
        <form className='wrapper' onSubmit={this.handleSubmit.bind( this )}>
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={evt => { this.email = evt.target.value }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={evt => { this.password = evt.target.value }}
            margin="normal"
            variant="outlined"
          />
          <div className='spaceBetween buttons'>
            <Button onClick={() => { this.action = 'logIn' }} type='submit' color='primary' size='large' variant='contained'>
              LOG IN
              </Button>
            <Button onClick={() => {this.action = 'signUp'}}  type='submit' color='primary' size='large' variant='contained'>
              SIGN UP
              </Button>
          </div>
        </form>
      </Paper>
      <style jsx>{layoutStyles}</style>
      <style jsx>{`
        .buttons{
          margin-top:10px;
          padding:5px;
        }
        .wrapper{
          padding:50px;
          display: flex ;
          flex-direction: column;
        }
      `}</style>
    </div>);
  }
}

export default Auth;