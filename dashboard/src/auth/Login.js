import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
Paper,
Grid} from '@material-ui/core/'

import api from '../api'

const CLIENT_ID = '385555121987-n51lgjatf4olrohh10540j8k034f1098.apps.googleusercontent.com'

const styles = theme => ({
  root: {
    maxWidth: 560,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  
    // backgroundColor: "blue",
  },
  card: {
    maxWidth: 340,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    // background: '#2C3C4F'
    
  },
  media: {
      height: 0,
      padding: '40px 40px',
      //paddingTop: '56.25%', // 16:9
  },
  logo: {
    backgroundImage: `url(${require('../assets/images/logo.png')})`,
    backgroundRepeat: 'no-repeat',
    height: 200,
    width: 300,
    backgroundSize: 'contain',
    margin: 40,
  },
  paper: {
    //marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  media: {
    maxWidth: 200,
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button:{
    marginBottom: 20,
    padding: 5,
  },
})

class Login extends Component {
  onAuthSuccess = async googleResponse => {
    const sessionResponse = await api.Session.create({ body: { tokenId: googleResponse.tokenId } })
    if (sessionResponse.success()) {
      const session = sessionResponse.data()
      window.localStorage.setItem('access_token', session.accessToken)
      const to = this.props.location.state.from || '/'
      this.props.history.push(to)
    }
  }

  onAuthFailure = response => {
    console.log(response)
    alert('Something went wrong. Talk to the tech team.')
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
      {/* <Card className={classes.card}> */}
      <div className={classes.logo}></div>
      <GoogleLogin
        className={classes.button}
        clientId={CLIENT_ID}
        buttonText='Login'
        onSuccess={this.onAuthSuccess}
        onFailure={this.onAuthFailure}/> 
      {/* </Card> */}
      </div>
    )
  }
}

export default withStyles(styles)(Login)
