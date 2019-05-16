import React, { Component } from 'react'
import { format } from 'date-fns'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import withStyles from '@material-ui/core/styles/withStyles'

import api from '../api'

const styles = theme => ({
  container: {
    maxWidth: 1200,
    width: '100%',
    padding: theme.spacing.unit * 3
  }
})

class FarmsList extends Component {
  state = {
    farms: [],
    anchorEl: null
  }

  async componentDidMount () {
    const response = await api.Farms.all()
    //.split('/[').join('').split(']').join('')
    console.log(JSON.parse(response.responseData)[0].farms)
    this.setState({ farms: JSON.parse(response.responseData)[0].farms })
  }

  openActions = (farm, event) => {
    event.stopPropagation()
    this.setState({ transientFarm: farm, anchorEl: event.currentTarget })
  }

  closeActions = () => {
    this.setState({ transientFarm: null, anchorEl: null })
  }

  render () {
    const { history, classes } = this.props
    const { anchorEl } = this.state

    return (
      <main className={classes.container}>
        <Typography variant='h4' gutterBottom color='inherit'>Payments</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Location</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.farms.map(farm =>
                <TableRow
                  key={farm.id}
                  hover
                  onClick={() => history.push(`/farms/${farm.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{farm.id}</TableCell>
                  <TableCell>{farm.location}</TableCell>
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(FarmsList)
