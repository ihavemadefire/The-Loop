import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 300,
    backgroundColor: 'white',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 10px 0 10px'
  }
});

const InfoCard = (props) => {
  const classes = useStyles();

  //const event = props.data
  const venue = props.data.venue;
  //console.log(event);
  //console.log(venue);
  //console.log(`${venue.name} is selected in infocard`);

  return (
    <div className={classes.card}>
      <div className={classes.image}>
        <img src={venue.image} alt={venue.name} width='300px' height='150px'></img>
      </div>
      <div className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          {venue.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
         {venue.shortDescription}
        </Typography>
        <Button size="small" color="primary" onClick={() => props.clearSelection(0)}>
          close
        </Button>
      </div>
    </div>
  )

};

export default InfoCard;