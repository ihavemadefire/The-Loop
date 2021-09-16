import React from 'react';
import InfoCard from './InfoCard.js';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { COLORS } from '../../styles/colors.js';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles({
  locationIcon: {
    color: COLORS.regRed,
    opacity: 0.5,
  },
  iconButton: {
    color: COLORS.darkBlue,
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
    }
  },
  selectedIconButton: {
    color: COLORS.regRed,
    opacity: 1,
    '&:hover': {
      opacity: 1,
    }
  },
  cardDisplay: {
  },
  cardHide: {
    display: 'hidden'
  }
});

const Marker = (props) => {
  const classes = useStyles();

  const isSelected = props.data.id === props.currentSelection;
  if (isSelected) {
    console.log(`Marker for ${props.data.name} currently selected`);
  }

  return (
    <div>
      <LocationOnIcon 
        button
        className={(props.data.id === props.currentSelection) ? classes.selectedIconButton : classes.iconButton}
        onClick={() => props.locationClickHandler()}
      >
      </LocationOnIcon>
      {isSelected && 
        <InfoCard 
          selectedEvent={(props.data.id === props.currentSelection)}
          data={props.data}
          clearSelection={() => props.clearSelection(0)}
        />
      }
    </div>
  )
}

export default Marker;