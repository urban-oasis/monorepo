import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {Menu,MenuItem, CircularProgress, Grid} from '@material-ui/core/'
import withStyles from '@material-ui/core/styles/withStyles'
import CustomTableCell from '../components/CustomTableCell'
import api from '../api'
import CustomTable from '../components/CustomTable'


const styles = theme => ({
  container: {
    maxWidth: 1200,
    width: '100%',
    padding: theme.spacing.unit * 3,
  },
  root: {
    flexGrow: 1,
    padding: '128px 40px',
  },
  progress:{
    alignItems: 'center',
    justifyContent: 'center',
  }
})
const HEADERS = ['Id', 'Location']
const ATTRIBUTES = ['id', 'location']

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
    const { anchorEl,farms } = this.state

    return (
      <main className={classes.root}>
        <Grid container align='center' spacing={24}>
        <Grid item item xs={12}>
        <Typography
        variant='h4' gutterBottom color='secondary'
        >Farms</Typography>
        </Grid>      
        {(farms.length==0)?
        <Grid item xs={12} md={6}>
                <CircularProgress className={classes.progress}/>
         </Grid>
         :
        (<Grid item xs={12}>
          <CustomTable
            data={farms} headers={HEADERS} attributes={ATTRIBUTES}
            funcConfig ={{path: 'farms', history:history}}>
          </CustomTable>
          </Grid>)
          }
        </Grid>

      </main>
    )
  }
}

export default withStyles(styles)(FarmsList)
