import React from 'react';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';


import { ReactComponent as Logo } from './loop_logo.svg';
import { COLORS } from '../../styles/colors.js';



const LogoAlone = () => (
	<LogoContainer>
		<Logo fill={COLORS.darkBlue} height='4rem' />
	</LogoContainer>
);

const LogoContainer = styled(Container) ({
	// display: 'block',
	margin: '.7rem 0 0 0',
	width: 'auto'
});


export default LogoAlone;