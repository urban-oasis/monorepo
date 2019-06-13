import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AppBarUser from '../components/AppBarUser'
import SideMenu from '../components/SideMenu'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //window.localStorage.access_token 
  const accessToken  = window.localStorage.getItem('access_token')
  return (
    <Route {...rest} render={(props) => (
      accessToken
        ? <Fragment>
          <AppBarUser />
          <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <SideMenu/>
         <Component {...props} />
        </div>
        </Fragment>
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  )
}

export default ProtectedRoute
