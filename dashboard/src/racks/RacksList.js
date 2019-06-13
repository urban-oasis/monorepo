import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
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
    padding: '16px 40px',
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
        <Grid item xs={12}>
        <Typography
        variant='h4' gutterBottom color='secondary'
        >Modules</Typography>
        </Grid>
        {(racks.length ===0)?
        <Grid item xs={12}>
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
