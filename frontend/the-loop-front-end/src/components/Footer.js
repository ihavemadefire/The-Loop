import React from 'react';
import styled from "styled-components"
import { COLORS } from '../styles/colors.js';

const Footer = () => (
	<FootStyled>
		a portfolio project
	</FootStyled>
);

const FootStyled = styled.div`
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100vw;
	height: 30px;
	text-align: center;
	background-color: white;
	color: ${COLORS.darkBlue}
`

export default Footer;