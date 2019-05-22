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
import CustomTable from '../components/CustomTable'

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
const HEADERS = ['Id','Growing','Air temp','Water temp','CO2','Ph','EC','Humidity','Light','Last update']
const ATTRIBUTES = ['id','growing','temp_air','temp_water','co2','ph','ec','humidity','light','timestamp']


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
       <CustomTable
         data={racks} headers={HEADERS} attributes={ATTRIBUTES}
         funcConfig ={{path: 'racks', sendState: true, history:history}}>
       </CustomTable>
       </Grid>)}
        </Grid>

      </main>
    )
  }
}

export default withStyles(styles)(RacksList)
