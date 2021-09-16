import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FooterModal from './FooterModal.js';
import { COLORS } from '../styles/colors.js';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100vw',
    height: '40px',
    textAlign: 'center',
    backgroundColor: 'white',
    color: COLORS.darkBlue,
    borderTop: `1px solid ${COLORS.darkBlue}`
  }
})


const Footer = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.footer}>
      <FooterModal />
    </div>
  ) 
};

export default Footer;