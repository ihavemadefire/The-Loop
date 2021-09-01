import React from 'react';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import { FONTS } from '../styles/colors.js';

export function Chip(props) {
	
	const style = {
		backgroundColor: 'grey'
	};
	
	return (
		<ChipButton style={style}>
			{props.text}
		</ChipButton>
	)
};

const ChipButton = styled(Button)({
	fontFamily: FONTS.body
})
