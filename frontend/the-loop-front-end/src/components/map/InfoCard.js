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
  root: {
    maxWidth: 345,
  },
});

const InfoCard = (props) => {
  const classes = useStyles();

  console.log(props.resultsData)

  

  if (props.selectedEvent) {
    const data = props.resultsData.filter(result => result.id === props.selectedEvent)[0];
    const venue = data.venue;
    console.log(data);
    console.log(venue);
    return (
      <Card 
        className={classes.root}
        lat={venue.lat}
        lng={venue.lng}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
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
  }
  return (null);

};

export default InfoCard;