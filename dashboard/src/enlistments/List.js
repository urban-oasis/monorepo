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
import { string } from 'prop-types';

const styles = theme => ({
  container: {
    maxWidth: 1200,
    width: '100%',
    padding: theme.spacing.unit * 3
  }
})

const labels = {
  'true': 'Enlisted',
  'false': 'Not enlisted'
}

class EnlistmentsList extends Component {
  state = {
    enlistments: [],
    anchorEl: null
  }

  async componentDidMount () {
    const response = await api.Enlistment.all()
    this.setState({ enlistments: response.data() })
  }

  openActions = (enlistment, event) => {
    event.stopPropagation()
    this.setState({ transientEnlistment: enlistment, anchorEl: event.currentTarget })
  }

  closeActions = () => {
    this.setState({ transientEnlistment: null, anchorEl: null })
  }

  render () {
    const { history, classes } = this.props

    return (
      <main className={classes.container}>
        <Typography variant='h6' color='inherit'>Enlistments</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PNO</TableCell>
                <TableCell>Postal Code</TableCell>
                <TableCell>Last modified</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.enlistments.map(enlistment =>
                <TableRow
                  key={enlistment.id}
                  hover
                  onClick={() => history.push(`/enlistments/${enlistment.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    {enlistment.pno}
                  </TableCell>
                  <TableCell>{((enlistment.enlisted === true) ? 'Enlisted':'Not enlisted')}
                  </TableCell>
                  <TableCell>
                    {enlistment.updatedAt}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(EnlistmentsList)
