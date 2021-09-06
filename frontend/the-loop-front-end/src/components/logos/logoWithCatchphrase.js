import React from 'react';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';


import { ReactComponent as Logo } from './loop_logo_slogan.svg';
import { COLORS } from '../../styles/colors.js';



const LogoWithCatchphrase = () => (
	<LogoContainer>
		<Logo fill={COLORS.darkBlue} />
	</LogoContainer>
);

const LogoContainer = styled(Container) ({
	width: '80vw',
	display: 'block',
	margin: '4rem 0 4rem 0',
	maxWidth: '350px'
});


export default LogoWithCatchphrase;