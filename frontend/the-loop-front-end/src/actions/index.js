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

export const setHighlightedIndex = (index) => {
  return {
    type: 'SET_SELECTED_INDEX',
    payload: index,
  };
};