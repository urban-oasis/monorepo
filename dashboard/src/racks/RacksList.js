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
import {Grid, CircularProgress} from '@material-ui/core/'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import withStyles from '@material-ui/core/styles/withStyles'

import api from '../api'

const styles = theme => ({
  container: {
    maxWidth: 1200,
    width: '100%',
    padding: theme.spacing.unit * 3
  },
  root: {
    flexGrow: 1,
    padding: '128px 40px',
  },
})

class RacksList extends Component {
  state = {
    racks: [],
    anchorEl: null
  }

  async componentDidMount () {
    const urlSplit = window.location.href.split('/')
    const response = await api.Racks.all({ farm: urlSplit[urlSplit.length - 1] })
    this.setState({ racks: JSON.parse(response.responseData)[0].racks })
  }

  openActions = (rack, event) => {
    event.stopPropagation()
    this.setState({ transientRack: rack, anchorEl: event.currentTarget })
  }

  closeActions = () => {
    this.setState({ transientRack: null, anchorEl: null })
  }

  render () {
    const { history, classes } = this.props
    const { anchorEl,racks} = this.state

    return (
      <main className={classes.root}>
        <Grid container align='center' spacing={24}>
        <Grid item item xs={12}>
        <Typography
        variant='h4' gutterBottom color='secondary'
        >Racks</Typography>
        </Grid>
        {(racks.length==0)?
        <Grid item xs={12} md={6}>
                <CircularProgress className={classes.progress}/>
         </Grid>
         :
       (<Grid item xs={12} >
       <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Growing</TableCell>
                <TableCell>Air temp</TableCell>
                <TableCell>Water temp</TableCell>
                <TableCell>CO2</TableCell>
                <TableCell>Ph</TableCell>
                <TableCell>EC</TableCell>
                <TableCell>Humidity</TableCell>
                <TableCell>Light</TableCell>
                <TableCell>Last update</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.racks.map(rack =>
                <TableRow
                  key={rack.id}
                  hover
                  onClick={() => history.push({
                    pathname:`/racks/${rack.id}`,
                    state: {rack: rack}})}
                  style={{ cursor: 'pointer' }}
                >
                {[rack.id,
                   rack.growing,
                    rack.temp_air,
                    rack.temp_water,
                    rack.co2,
                    rack.ph,
                    rack.ec,
                    rack.humidity,
                    rack.light
                    ].map(cell=><TableCell>{cell}</TableCell>)}
                  <TableCell>
                    {format(new Date(rack.timestamp), 'YYYY-MM-DDTHH:mm:ssZ')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper></Grid>)}
        </Grid>

      </main>
    )
  }
}

export default withStyles(styles)(RacksList)
