import React from 'react'
import ReactDOM from 'react-dom'
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import App from './App'
const theme = createMuiTheme({
    palette: {
      primary: {main: '#7DC243'},
      secondary: {main: '#2C3C4F'} ,
    },
  });
ReactDOM.render(
    <MuiThemeProvider theme = {theme}>
    <App />
    </MuiThemeProvider>
    , document.getElementById('root'))
