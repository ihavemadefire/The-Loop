// Action creators

export const setTimeNow = () => {
	return {
		type: 'TIME_NOW_SELECTED'
	};
};

export const setTimeAny = () => {
	return {
		type: 'TIME_ANY_SELECTED'
	};
};

export const setTimeLater = () => {
	return {
		type: 'TIME_LATER_SELECTED'
	};
};

export const setTimeAll = () => {
	return {
		type: 'TIME_ALL_SELECTED'
	};
};

export const setMainApp = () => {
	return {
		type: 'SHOW_MAIN_APP'
	};
};

export const setEventSearch = () => {
	return {
		type: 'SEARCH_FOR_EVENTS'
	};
};

export const setPlaceSearch = () => {
	return {
		type: 'SEARCH_FOR_PLACES'
	};
};

export const setMapShow = () => {
  return {
    type: 'SHOW_MAP'
  };
};

export const setMapHide = () => {
  return {
    type: 'HIDE_MAP'
  };
};

export const setCurrentData = (data) => {
  return {
    type: 'RESET_DATA',
    payload: data
  };
};

export const addResultsData = (data) => {
  return {
    type: 'SET_RESULTS_DATA',
    payload: data
  };
};

export const clearResultsData = () => {
  return {
    type: 'CLEAR_RESULTS_DATA',
  };
};

export const setHighlightedIndex = (index) => {
  return {
    type: 'SET_SELECTED_INDEX',
    payload: index,
  };
};

export const setEventTypeFilterList = (data) => {
  return {
    type: 'SET_EVENT_TYPE_FILTERS',
    payload: data,
  };
};

export const addEventTypeFilterList = (data) => {
  return {
    type: 'ADD_EVENT_TYPE_FILTERS',
    payload: data,
  };
};

export const delEventTypeFilterList = () => {
  return {
    type: 'DEL_EVENT_TYPE_FILTERS',
  };
};