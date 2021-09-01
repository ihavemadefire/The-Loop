import React from 'react';
import { Box, Container, ButtonGroup, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { setTimeNow, setTimeAny, setTimeLater } from '../actions/index.js';
import LogoWithCatchphrase from './logos/logoWithCatchphrase.js';
import { COLORS } from '../styles/colors.js';



const LandingForm = (props) => {
	const classes = useStyles();

	//console.log(props);
	const handleTimeFrameSelection = time => {
		if (time === props.timeFrame) {
			return classes.selectedChip;
		} 
		return classes.chip;
	}

	return (
		<Container maxWidth="sm">
			<Box className={classes.box} color="primary">
				<LogoWithCatchphrase />
				<ButtonGroup variant="text" size="large" color="primary" aria-label="large outlined primary button group">
					<Button 
						className={handleTimeFrameSelection('now')}
						onClick={() => props.setTimeNow()}
					>
						now
					</Button>
					<Button 
						className={handleTimeFrameSelection('later')}
						onClick={() => props.setTimeLater()}
					>
						later
					</Button>
				</ButtonGroup>
				<Button className={classes.mainButton} variant="contained" color="primary">loop me in</Button>
			</Box>
		</Container>
	);
};

const useStyles = makeStyles({
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems:'center'
	},
	mainButton: {
		marginTop: '2rem',
		fontWeight: 700,
		fontSize: '1.5rem',
		width: '80vw',
		maxWidth: '325px'
	},
	chip: {
		fontWeight: 500,
		fontSize: '1.2rem',
	},
	selectedChip: {
		fontWeight: 700,
		fontSize: '1.2rem',
		color: COLORS.regRed,
	}
});

const mapStateToProps = (state) => {
	return { timeFrame: state.timeFrame };
};

export default connect(mapStateToProps, { setTimeAny, setTimeNow, setTimeLater })(LandingForm);