import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { withStyles } from '@material-ui/core/styles'

import api from '../api'

const CLIENT_ID = '385555121987-n51lgjatf4olrohh10540j8k034f1098.apps.googleusercontent.com'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
})

class Login extends Component {
  onAuthSuccess = async googleResponse => {
    const sessionResponse = await api.Session.create({ body: { tokenId: googleResponse.tokenId } })
    if (sessionResponse.success()) {
      const session = sessionResponse.data()
      window.localStorage.setItem('accessToken', session.accessToken)
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
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={this.onAuthSuccess}
          onFailure={this.onAuthFailure}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Login)
