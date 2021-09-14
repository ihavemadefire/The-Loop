import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LogoAlone from '../logos/Logo.js';
import MenuListTime from './MenuListTime.js';
// import AmenityList from './AmenityList.js';
import EventTypeList from './EventTypeList.js';
import { COLORS } from '../../styles/colors.js'

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: 'white',
		transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
		height: '80px',
  },
	drawerSubHeader: {
		display: 'flex',
		alignItems: 'center',
		margin: '1rem 0 0 1rem',
		color: COLORS.darkBlue,
	},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
	caption: {
		color: COLORS.darkBlue,
		overflow: 'hidden'
	},
	catchphrase: {
		display: 'flex',
		margin: '0 1rem 0 0',
		alignItems: 'center',
	},
	toolbar: {
		display: 'flex',
	},
	menuItems: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width: '100%',
	}
}));

export default function MenuBarRightDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

	const catchphraseClosedDrawer = useMediaQuery('(min-width: 470px)');
	const catchphraseOpenDrawer = useMediaQuery('(min-width: 680px)');
	
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters className={classes.toolbar} >
					<LogoAlone />
					<div className={classes.menuItems}>
						{( ((!open && catchphraseClosedDrawer) || (open && catchphraseOpenDrawer)) && 
							<div className={classes.catchphrase}>
								<Typography variant={'h6'} className={classes.caption}>find things to do:</Typography> 
							</div>
						)}
						{/* <MenuListType /> */}
						<MenuListTime updateTimeParam={(param) => props.updateTimeParam(param)}/>
						<Button
							color="primary"
							aria-label="open drawer"
							edge="end"
							onClick={handleDrawerOpen}
							className={clsx(open && classes.hide)}
							>
							{/* Add feature to show the number of things selected using redux and other icons */}
							<FilterNoneIcon />
						</Button>
					</div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
					<Typography variant={'h5'} className={classes.caption}>refine search</Typography>
        </div>
        <Divider />
					<div className={classes.drawerSubHeader}>
						<Typography variant={'subtitle1'}>I'm looking for:</Typography>
					</div>
					<EventTypeList updateSearchParams={(checked) => props.updateSearchParams(checked)}/>
				{/* To be added later
        <Divider />
					<div className={classes.drawerSubHeader}>
						<Typography variant={'subtitle1'}>Must have:</Typography>
					</div>
	        <AmenityList /> */}
      </Drawer>
    </div>
  );
}
