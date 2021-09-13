import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';

import { apiKey } from './api_key';

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
  }
});

const defaultProps = {
  center: {
    lat: 36.153982,
    lng: -95.992775
  },
  zoom: 15
};

const GoogMap = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}      
      >
      </GoogleMapReact>
    </div>
  )
}

export default GoogMap;