import React from 'react'
import ReactDOM from 'react-dom'
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import {PRIMARY, SECONDARY} from './constants/Colors'
import App from './App'
import {Provider} from 'react-redux'
import store from './Redux/store'


const theme = createMuiTheme({
    palette: {
      primary: {main: PRIMARY},
      secondary: {main: SECONDARY} ,
    },
  });
ReactDOM.render(
    <Provider store ={store}>
      <MuiThemeProvider theme = {theme}>
        <App />
      </MuiThemeProvider>
     </Provider>
    , document.getElementById('root'))
