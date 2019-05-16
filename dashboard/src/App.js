import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import { ProtectedRoute, Login } from './auth'
import { FarmsList } from './farms'
import { RacksList } from './racks'
import { SensorsOverview } from './sensors'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

class App extends Component {
  render () {
    const { classes } = this.props
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Switch>
            <ProtectedRoute path='/' exact component={FarmsList} />
            <ProtectedRoute path='/farms/:farm_id' component={RacksList} />
            <ProtectedRoute path='/racks/:rack_id' exact component={SensorsOverview} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    )
  }
}
// <ProtectedRoute path='/farms/:farm_id/:rack_id/update' exact component={RackEdit} />
export default withStyles(styles)(App)
