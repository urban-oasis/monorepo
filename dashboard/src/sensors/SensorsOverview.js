import React, { Component } from 'react'
import { format } from 'date-fns'
import withStyles from '@material-ui/core/styles/withStyles'
import {
  Paper,
  Typography,
  Grid,
  Card,
  CircularProgress,
} from '@material-ui/core/';
import Plot from 'react-plotly.js';
import UpdateModal from '../components/UpdateModal'
import api from '../api'
import {ALL_KPIS, DISPLAY_KPIS, KPI_TIMESTAMP} from '../constants/KPIS'
import {PRIMARY, SECONDARY} from '../constants/Colors'
import Switcher from '../components/Switcher'


const TITLES = {co2: "CO2",
  ec: "EC",
  humidity: "Humidity",
  ph: "PH", 
  temp_air:"Temperatur Air",
  temp_water:"Temperatur Water",
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '16px 40px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  plot:{

   //backgroundColor: "white",
    position: 'relative',
    //maxWidth: 560,
  },

})

class SensorsOverview extends Component {
  state = {
    sensors: [],
    formData: {}
  }

  async componentDidMount () {
    const urlSplit = window.location.href.split('/')
    const { history} = this.props
    console.log(history)
    const historyLocation = history.location
    if(!historyLocation.state) 
      history.push('/')
    else{
    const rackData = historyLocation.state.data
    const response = await api.Sensors.all({
      farm: rackData.farm_id,
      rack: rackData.id,
      // fromUtc: "2019-05-04T00:00:00",
      // toUtc: "2019-05-04T23:00:00"
    })
    const parsedResponse = JSON.parse(response.responseData)
    this.setState({ sensors: parsedResponse })
    let formData= {farmId: rackData.farm_id,rackId: rackData.id,
    growing: rackData.growing }
    ALL_KPIS.map(kpi => formData[kpi] = parsedResponse.reduce((tot, curr) => tot.concat(curr[kpi]),[]))
    this.setState({formData: formData})

  }}

createPlot=(obj) =>{
  const {growing, timestamps,data,kpi} = obj
  const {classes} = this.props
  let layout = {width: 500, height: 400, title:  TITLES[kpi] }
  console.log(obj)
  let plotData = [
    {
      x: timestamps,
      y: data,
      type: 'scatter',
      line: {color: PRIMARY}

    },

  ]
  return (
    <>
    <Plot data={plotData} layout={layout} config={{displayModeBar: false}}/>
    <UpdateModal kpi={TITLES[kpi]}></UpdateModal>
    </>
    )
}

createPlots=()=>{
  const {formData} = this.state
  const {classes} = this.props
  console.log("creating plots")
  let plots = DISPLAY_KPIS.map(kpi => 
    
    <Grid key={kpi} item xs={12} md={6}
    align='center'
    className={classes.plot}>
    <Paper>
    {this.createPlot({timestamps: formData[KPI_TIMESTAMP],
    data: formData[kpi],
    kpi: kpi,
    // rackId: formData.rackId,
    // farmId: formData.farmId,
    growing: "growing",})}
    </Paper>
    </Grid>
    )
 return (plots)
}


  render () {
    const { history, classes } = this.props
    const {sensors, formData} = this.state;
        //const { } = this.state
    const plots = this.createPlots() 
    // console.log("hos plot looks")
    // console.log(plots)
     console.log("Sensor")
    console.log(sensors.length)
    console.log(formData)

    return (
      <div className={classes.root}>
      <Grid container align='center' spacing={24}>
      {(sensors.length>0)?
      <>
      <Grid item xs={12}>
      <Grid container align='center' spacing={24}>
      <Grid item xs={4}>
      <Card>

      <Typography align='center' variant='h6' gutterBottom color='secondary'>
         {`Farm: ${formData.farmId}`}</Typography>
         </Card>

         </Grid>

         <Grid item xs={4}>
        <Card>
      <Typography align='center' variant='h6' gutterBottom color='secondary'>
         {`Module: ${formData.rackId}`}</Typography>
         </Card>
         </Grid>
         <Grid item xs={4}>
         <Card>
      <Typography align='center' variant='h6' gutterBottom color='secondary'>
         {`Growing: ${formData.growing}`}</Typography>
         </Card>

         </Grid>
        </Grid>
       </Grid>
       {plots}
      <Grid item xs={12} align='center'>
         <Card>
       <Switcher/>
       </Card>
       </Grid>

       </>
      :
      <Grid item xs={12}>
        <CircularProgress />
      </Grid>
      }
      </Grid>

    </div>
    )
  }
}

export default withStyles(styles)(SensorsOverview)
