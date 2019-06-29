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
  TextField,
Paper,
Grid} from '@material-ui/core/'

import api from '../api'

const CLIENT_ID = '385555121987-n51lgjatf4olrohh10540j8k034f1098.apps.googleusercontent.com'

const styles = theme => ({
  root: {
    maxWidth: 560,
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    // borderStyle: 'solid',
  
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
    margin:'40px 40px 0 40px',
    position: 'relative'
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
    width: '100%',
    marginTop: '16px'
    // marginLeft:'16px'
// : 5,
  },
})

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
       password: null,
       email: null
    }
  }
  onAuthSuccess = async googleResponse => {
    const sessionResponse = await api.Session.create({ body: { tokenId: googleResponse.tokenId } })
    if (sessionResponse.success()) {
      const session = sessionResponse.data()
      window.localStorage.setItem('access_token', session.accessToken)
      const to = this.props.location.state.from || '/'
      this.props.history.push(to)
    }
  }

  onLoginSuccess =()=>{
    const {email} = this.state;
    if (email.includes('@urbanoasis.life')){
    window.localStorage.setItem('access_token', 'OEU@3o-4234JE-32Ujeo?@!');
    this.props.history.push('/');
  }

  }

  onAuthFailure = response => {
    console.log(response)
    alert('Something went wrong. Talk to the tech team.')
  }
  responseGoogle = (response) => {
    console.log("..2",response);
  }

  render () {
    const { classes } = this.props
    const {password, email} = this.state;
    const emailIsValid = !(email? email.includes('@'): false)   
    const passwordIsValid = !(password? password.length>6: false)
  
    return (
      <div className={classes.root}>
      {/* <Card className={classes.card}> */}
      <div className={classes.logo}></div>
      <TextField
      required
      error={emailIsValid}
          id="outlined-full-width"
          label="Email"
          // style={{ margin: 8 }}
          placeholder="Enter your email"
          // helperText="Full width!"
          value = {email}
          onChange = {event =>(this.setState({email: event.target.value}))}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            required:true
          }}
        />
      <TextField
      required
      error={passwordIsValid}
          id="outlined-full-width"
          label="Password"
          // style={{ margin: 8 }}
          placeholder="Enter your password"
          value={password}
          // helperText="Full width!"
          fullWidth
          onChange = {event =>(this.setState({password: event.target.value}))}
          margin="normal"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          InputLabelProps={{
            shrink: true,
          }}  
          InputProps={{
            required:true
          }}
        />
        <div style={{display:'flex', justifyContent:'center'}}>
         <Button className={classes.Button}
         onClick={this.onLoginSuccess}
         variant="contained"
          color="primary" 
          className={classes.button}>
        Login
      </Button>
      </div>
      {/* </Card> */}
      </div>
    )
  }
}

export default withStyles(styles)(Login)
