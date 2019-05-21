import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AppBar from '../components/AppBar'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //window.localStorage.access_token 
  const accessToken  = window.localStorage.getItem('access_token')
  return (
    <Route {...rest} render={(props) => (
      accessToken
        ? <Fragment><AppBar /><Component {...props} /></Fragment>
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  )
}

export default ProtectedRoute
