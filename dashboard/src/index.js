import React from 'react'
import ReactDOM from 'react-dom'
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import {PRIMARY, SECONDARY} from './constants/Colors'
import App from './App'


const theme = createMuiTheme({
    palette: {
      primary: {main: PRIMARY},
      secondary: {main: SECONDARY} ,
    },
  });
ReactDOM.render(
    <MuiThemeProvider theme = {theme}>
    <App />
    </MuiThemeProvider>
    , document.getElementById('root'))
