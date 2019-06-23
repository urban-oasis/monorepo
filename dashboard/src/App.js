import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import { ProtectedRoute, Login } from './auth'
import { FarmsList } from './farms'
import { RacksList } from './racks'
import { SensorsOverview } from './sensors'
import AddUser from './components/AddUser'




const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

class App extends Component {
  render () {
    //window.localStorage.setItem('access_token', 'OEU@3o-4234JE-32Ujeo?@!');
    const { classes } = this.props
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/' exact component={FarmsList} />
            <ProtectedRoute path='/farms/:farm_id' component={RacksList} />
            <ProtectedRoute path='/racks/:rack_id' exact component={SensorsOverview} />
            <ProtectedRoute path='/users' exact component={AddUser} />
          </Switch>
        </div>
      </Router>
    )
  }
}
// <ProtectedRoute path='/farms/:farm_id/:rack_id/update' exact component={RackEdit} />
export default withStyles(styles)(App)
