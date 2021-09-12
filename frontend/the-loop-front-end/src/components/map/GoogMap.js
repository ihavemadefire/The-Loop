import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    padding: '0 0 0 0'
  },
  temp: {
    backgroundColor: 'lightgreen',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const GoogMap = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.temp}>mapmamammamamamamp</div>
    </Container>
  )
}

export default GoogMap;