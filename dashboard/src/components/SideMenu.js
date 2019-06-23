import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import InsertChart from '@material-ui/icons/InsertChart';
import Event from '@material-ui/icons/Event';
import AccessTime from '@material-ui/icons/AccessTime';
import Settings from '@material-ui/icons/Settings';



const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  root:{
       backgroundColor: theme.palette.primary.main
  },
  primary: {},
  icon: {},
});

function SideMenu(props) {
  const { classes ,theme} = props;


  return (
      // <div className={classes.root} >
      <MenuList
        color='primary'>
        {/* <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SendIcon color='secondary'/>
          </ListItemIcon>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon color='secondary'/>
          </ListItemIcon>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <InboxIcon color='secondary'/>
          </ListItemIcon>
        </MenuItem> */}
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <InsertChart color='secondary' />
          </ListItemIcon>
          {/* <ListItemText classes={{ primary: classes.primary }} inset primary="Inbox" /> */}
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <Event color='secondary' />
          </ListItemIcon>
          {/* <ListItemText classes={{ primary: classes.primary }} inset primary="Inbox" /> */}
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}
          >
            <AccessTime color='secondary' />
          </ListItemIcon>
          {/* <ListItemText classes={{ primary: classes.primary }} inset primary="Inbox" /> */}
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}
          >
            <Settings color='secondary' />
          </ListItemIcon>
          {/* <ListItemText classes={{ primary: classes.primary }} inset primary="Inbox" /> */}
        </MenuItem>
      </MenuList>
      // </div>
  );
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);