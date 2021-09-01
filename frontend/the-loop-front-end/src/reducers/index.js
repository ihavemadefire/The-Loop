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

export default combineReducers({
	timeFrame: timeFrameReducer
});