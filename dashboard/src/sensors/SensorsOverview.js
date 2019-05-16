import React, { Component } from 'react'
import { format } from 'date-fns'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile'
import Grid from '@material-ui/core/Grid';

import api from '../api'
import { Line } from 'react-chartjs-2'


const styles = theme => ({
  container: {
    maxWidth: 1200,
    width: '100%',
    padding: theme.spacing.unit * 3
  }
})

class SensorsOverview extends Component {
  state = {
    sensors: []
  }

  async componentDidMount () {
    const urlSplit = window.location.href.split('/')
    console.log(urlSplit)
    const response = await api.Sensors.all({
      farm: 1,
      rack: 1,
      fromUtc: "2019-05-04T00:00:00",
      toUtc: "2019-05-04T23:00:00"
    })
    console.log(JSON.parse(response.responseData))
    this.setState({ sensors: JSON.parse(response.responseData) })
  }

  render () {
    const { history, classes } = this.props
    //const { } = this.state
    const data = {
      labels: ["jan", "feb", "dec"],
      datasets: [
        {
          label: "blabla",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80]
        }
      ]
    }
    return (
      <main className={classes.container}>
        <Typography variant='h4' gutterBottom color='inherit'>Sensors</Typography>
          <Grid className={classes.gridList} spacing={56}>
            <Grid item xs={22}>
              <Grid container className={classes.demo} justify="center" spacing={56}>
                {this.state.sensors.map(sensor => (
                  <Grid key={sensor.rack} item>
                    <Paper>
                      <Line data={data} />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
      </main>
    )
  }
}

export default withStyles(styles)(SensorsOverview)
