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

const searchTypeReducer = (searchType = 'events', action) => {
	if (action.type === 'SEARCH_FOR_EVENTS') {
		return 'events';
	} else if (action.type === 'SEARCH_FOR_PLACES') {
		return 'places';
	}
	return searchType;
};

const showMainAppReducer = (showMain = false, action) => {
	if (action.type === 'SHOW_MAIN_APP') {
		return true;
	}
	return showMain;
};

const showMapReducer = (showMapOverList = false, action) => {
	if (action.type === 'SHOW_MAP') {
		return true;
	} else if (action.type === 'HIDE_MAP') {
    return false;
  }
	return showMapOverList;
};

const currentDataSetReducer = (currentDataSet = null, action) => {
  if (action.type === 'RESET_DATA') {
    return action.payload;
  }
  return currentDataSet;
};

const selectedIndexReducer = (selectedIndex = 0, action) => {
  if (action.type === 'SET_SELECTED_INDEX') {
    return action.payload;
  }
  return selectedIndex;
}

export default combineReducers({
	showMain: showMainAppReducer,
	timeFrame: timeFrameReducer,
	searchType: searchTypeReducer,
  showMapOverList: showMapReducer,
  currentDataSet: currentDataSetReducer,
  selectedEventIndex: selectedIndexReducer,
});