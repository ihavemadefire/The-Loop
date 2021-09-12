import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import MenuBarRightDrawer from './menus/MenuBarRightDrawer.js';
import { setTimeNow, setTimeAny, setTimeLater, setMainApp } from '../actions/index.js';
import EventCard from './EventCard.js';
import GoogMap from './map/GoogMap.js';

const viewHeight = 'calc(100vh - 110px)'

const useStyles = makeStyles({
	container: {
		marginTop: 90,
	},
	list: {
		// marginTop: 80,
		// width: 375,
    minWidth: 350,
    maxWidth: 375,
		maxHeight: viewHeight,
		overflow: 'auto',
		zIndex: 1,
		'&::-webkit-scrollbar': {
			width: '0.4em',
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
			webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(0,0,0,.1)',
			// outline: '1px solid slategrey'
		}
	},
  box: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 80,
    marginBottom: 0,
    height: viewHeight
  }
})

const MainApp = (props) => {
	const classes = useStyles();

	if (props.showMainApp) {
		return (
			<>
				<MenuBarRightDrawer />
        	<Box className={classes.box} my={5}>
						<List className={classes.list}>
							<EventCard></EventCard>
						</List>
						<GoogMap />
        	</Box>

			</>
		)
			
	} else {
		return null;
	};
};


const mapStateToProps = (state) => {
	return { 
		timeFrame: state.timeFrame,
		showMainApp: state.showMain 
	};
};

export default connect(mapStateToProps, { setTimeAny, setTimeNow, setTimeLater, setMainApp })(MainApp);

