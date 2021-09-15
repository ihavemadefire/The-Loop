import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import { COLORS } from '../../styles/colors.js';
import { apiKey } from './api_key2';
import { setHighlightedIndex } from '../../actions/index.js';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    padding: '0 0 0 0',
    zIndex: 1,
  },
  temp: {
    backgroundColor: 'lightgreen',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    //color: COLORS.regRed,
  },
  iconButton: {
    color: COLORS.regRed,
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
    }
  },
  selectedIconButton: {
    color: COLORS.darkBlue,
    opacity: 1,
    '&:hover': {
      opacity: 1,
    }
  },
});


const GoogMap = (props) => {
  const classes = useStyles();

  const defaultProps = {
    center: {
      lat: 36.153982,
      lng: -95.992775
    },
    zoom: 15
  };


  const locationClickHandler = (e, eventId) => {
    props.setHighlightedIndex(eventId);
    props.changeSelection(eventId);
  };

  //console.log(props.currentSelection);


  return (
    <div className={classes.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}      
      >
        {(props.resultsData) &&
          props.resultsData.map((loopEvent) => (
              <IconButton
                className={(loopEvent.id === props.currentSelection) ? classes.selectedIconButton: classes.iconButton}
                key={loopEvent.id}
                color='secondary'
                lat={loopEvent.venue.lat}
                lng={loopEvent.venue.long}
                size='small'
                onClick={(e) => locationClickHandler(e, loopEvent.id)}
              >
                <LocationOnIcon 
                  fontSize={(loopEvent.id === props.currentSelection) ? 'large': 'small'}
                  className={classes.locationIcon}
                ></LocationOnIcon>
              </IconButton>
        ))}
      </GoogleMapReact>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentData: state.currentDataSet,
    selectedEventIndex: state.selectedEventIndex,
    resultsData: state.resultsData,
  };
};

export default connect(mapStateToProps, { setHighlightedIndex })(GoogMap);