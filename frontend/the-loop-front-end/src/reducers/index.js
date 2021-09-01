import { combineReducers } from 'redux';

const timeFrameReducer = (timeFrame = 'now', action) => {
	if (action.type === 'TIME_NOW_SELECTED') {
		return 'now';
	} else if (action.type === 'TIME_ANY_SELECTED') {
		return 'any';
	} else if (action.type === 'TIME_LATER_SELECTED') {
		return 'later';
	}
	return timeFrame;
};

const showMainAppReducer = (showMain = false, action) => {
	if (action.type === 'SHOW_MAIN_APP') {
		return true;
	}
	return showMain;
}

export default combineReducers({
	showMain: showMainAppReducer,
	timeFrame: timeFrameReducer,
});