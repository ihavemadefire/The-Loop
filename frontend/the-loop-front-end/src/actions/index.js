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