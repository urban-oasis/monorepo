import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import api from '../api'

const styles = theme => ({
  container: {
    maxWidth: 500,
    width: '100%',
    padding: theme.spacing.unit * 3
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    paddingTop: theme.spacing.unit * 8
  },
  form: {
    width: '100%'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class EnlistmentsEdit extends Component {
  state = {
    enlistment: null,
    updating: false
  }

  async componentDidMount () {
    const response = await api.Enlistment.byId({ id: this.props.match.params.id })
    this.setState({ enlistment: response.data() })
  }

  save = async event => {
    event.preventDefault()
    const { history } = this.props
    const { enlistment } = this.state
    try {
      this.setState({ updating: true })
      await api.Enlistment.update({ id: enlistment.id, body: enlistment })
      alert(`Enlistment ${enlistment.id} updated.`)
      history.push('/enlistments')
    } catch (err) {
      console.log(err)
      alert('Something went wrong. Talk to the tech team.')
    } finally {
      this.setState({ updating: false })
    }
  }

  render () {
    const { classes } = this.props

    if (!this.state.enlistment) {
      return null
    }

    const statuses = [
      { label: 'Enlisted', value: true },
      { label: 'Not enlisted', value: false }
    ]
    console.log(this.state.enlistment)
    return (
      <main className={classes.container}>
        <Paper className={classes.paper}>
        <Typography inline='true' variant='h4' gutterBottom>{this.state.enlistment.pno}</Typography>
          <form className={classes.form} onSubmit={this.save}>
            <TextField
              select
              label='Status'
              value={this.state.enlistment.enlisted}
              onChange={event => this.setState({ enlistment: { ...this.state.enlistment, enlisted: event.target.value } })}
              fullWidth
              margin='normal'
              disabled={this.state.updating}
            >
              {statuses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={this.state.updating}
              onClick={this.save}
            >
              {this.state.updating ? 'Updating..' : 'Update'}
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(EnlistmentsEdit)
