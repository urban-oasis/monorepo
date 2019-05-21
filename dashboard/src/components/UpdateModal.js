import React, {Component}from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Typography,Button, IconButton,Modal,TextField} from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

function getModalStyle() {
  const top = 50;
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  button:{
    margin: theme.spacing.unit,
    position: 'absolute',
    top: 24,
    right: 24,
  },
});

class SimpleUpdateModal extends Component{
    state = {
        open: false,
        value: '',
      };

      handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
   
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    render(){
    const {classes, kpi} = this.props;
    return(
        <div>
        <IconButton color="secondary" className={classes.button}
        onClick={this.handleOpen}>
        <CloudUploadIcon />
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
               Set {kpi}
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
            <TextField
          id="standard-number"
          label="Number"
          value={this.state.age}
          onChange={this.handleChange('value')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        </form>
            <Button
            onClick={()=> alert(kpi +"send to baceknd" + this.state.value)}
            >Submit</Button>
            
          </div>
        </Modal>
      </div>
    )
    }
}

SimpleUpdateModal.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  // We need an intermediary variable for handling the recursive nesting.
  const UpdateModal = withStyles(styles)(SimpleUpdateModal);
  export default UpdateModal