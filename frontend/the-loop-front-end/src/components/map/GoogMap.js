import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import { COLORS } from '../../styles/colors.js';
import { apiKey } from './api_key2';
import { setHighlightedIndex } from '../../actions/index.js';
import InfoCard from './InfoCard.js';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    padding: '0 0 0 0',
    zIndex: 1,
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
  cardDisplay: {
  },
  cardHide: {
    display: 'hidden'
  }
});


const GoogMap = (props) => {
  const classes = useStyles();
  //const [infoCardLat, setInfoCardLat] = useState();
  //const [infoCardLng, setInfoCardLng] = useState();

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

  console.log(`Current selection event id: ${props.currentSelection}`);


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
                  className={classes.locationIcon}
                ></LocationOnIcon>
              </IconButton>
        ))}
        <InfoCard 
          selectedEvent={props.currentSelection}
          resultsData={props.resultsData}
          
          //setLat={setInfoCardLat()}
          //setLng={setInfoCardLng()}

        />
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