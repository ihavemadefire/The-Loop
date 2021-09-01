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