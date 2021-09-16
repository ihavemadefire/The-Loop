import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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

  console.log(props.resultsData)

  
  const event = props.data
  const venue = props.data.venue;
  //console.log(event);
  //console.log(venue);
  console.log(`${venue.name} is selected in infocard`);

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

  return (
    <Card 
      className={classes.root}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="venue img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {venue.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Hide
        </Button>
      </CardActions>
    </Card>
  );
};

export default InfoCard;