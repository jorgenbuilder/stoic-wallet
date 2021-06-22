import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AccountDrawer from '../components/AccountDrawer';
import SnackbarButton from '../components/SnackbarButton';

import AccountDetail from '../views/AccountDetail';
import AddressBook from '../views/AddressBook';
import Neurons from '../views/Neurons';
import Settings from '../views/Settings';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  toolbarButtons: {
    marginLeft: 'auto',
  },
  content: {
    flexGrow: 1,
  },

}));


var UNLOCKED = false, ACTIVE = false, INTV = false;
  const routes = {
    'accountDetail' : {
      title : "Account Details",
      view : AccountDetail
    },
    'neurons' : {
      title : "Neuron Management",
      view : Neurons
    },
    'addressBook' : {
      title : "Address Book",
      view : AddressBook
    },
    'settings' : {
      title : "Settings",
      view : Settings
    },
  };
//Helpers


function Wallet(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [route, setRoute] = React.useState('accountDetail');
  const [toolbarTitle, setToolbarTitle] = React.useState(routes[route].title);
  const dispatch = useDispatch()
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const renderView = (r) => {
    switch(r){
      case "accountDetail":
        return React.createElement(routes[r].view, {alert : props.alert, confirm : props.confirm, loader : props.loader})
      case "settings":
        return React.createElement(routes[r].view, {alert : props.alert, confirm : props.confirm, clearWallet : clearWallet})
      break;
      default:
        return React.createElement(routes[r].view, {alert : props.alert, confirm : props.confirm})
      break;
    }
  }
  const changeRoute = (r, i) => {
    setToolbarTitle(routes[r].title);
    setRoute(r);
    if (typeof i !== 'undefined') dispatch({ type: 'currentAccount', payload: {index:i}});
  };
  
  const lockWallet = () => {
    props.logout();
  };
  const clearWallet = () => {
    props.remove();
  };
  const wallet = {}; //Load in JS api?
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap>
            {toolbarTitle}
          </Typography>
          <div className={classes.toolbarButtons}>
            <IconButton
              color="inherit"
              aria-label="settings"   
              edge="end"
              onClick={() => changeRoute('settings')}
            >
              <AccountCircleIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AccountDrawer lockWallet={lockWallet} changeRoute={changeRoute} onClose={handleDrawerToggle} open={mobileOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {renderView(route)}
      </main>
    </div>
  );
}

export default Wallet;