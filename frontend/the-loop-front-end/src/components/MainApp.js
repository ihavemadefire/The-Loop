import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MenuBarRightDrawer from './menus/MenuBarRightDrawer.js';
import { setTimeNow, setTimeAny, setTimeLater, setMainApp } from '../actions/index.js';
import SimpleCard from './CardTemp.js';


const MainApp = (props) => {
	const classes = useStyles();

	if (props.showMainApp) {
		return (
			<>
				<MenuBarRightDrawer />
				<Container className={classes.container}>
        	<Box my={5}>
							<SimpleCard></SimpleCard>
        	</Box>
      	</Container>

			</>
		)
			
	} else {
		return null;
	};
};

const useStyles = makeStyles({
	container: {
		marginTop: '100px'
	}
})

const mapStateToProps = (state) => {
	return { 
		timeFrame: state.timeFrame,
		showMainApp: state.showMain 
	};
};

export default connect(mapStateToProps, { setTimeAny, setTimeNow, setTimeLater, setMainApp })(MainApp);

