import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { layoutStyles } from '../styles'

class Auth extends Component {
  render() {
    return (<div>
      <Paper elevation={1}>
        <div className='wrapper'>
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <div className='spaceBetween buttons'>
            <Button  color='primary' size='large' variant='contained'>
              LOG IN
            </Button>
            <Button  color='primary' size='large' variant='contained'>
              SIGN UP
            </Button>
          </div>
        </div>
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