import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { layoutStyles } from '../styles'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.action = ''
  }

  handleSubmit ( event ) {
    event.preventDefault();
    const formData = new window.FormData(event.target)
    console.log(this.action,formData.get('email'),formData.get('password'));
  }
  render() {
    return (<div>
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
            <Button onClick={() => { this.action = 'login' }} type='submit' color='primary' size='large' variant='contained'>
              LOG IN
              </Button>
            <Button onClick={() => {this.action = 'singUp'}}  type='submit' color='primary' size='large' variant='contained'>
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