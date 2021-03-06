import React, { useState } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import MenuBarRightDrawer from './menus/MenuBarRightDrawer.js';
import { setTimeNow, setTimeAny, setTimeLater, setMainApp, setMapHide, setMapShow } from '../actions/index.js';
import EventCard from './EventCard.js';
import GoogMap from './map/GoogMap.js';

const viewHeight = 'calc(100vh - 120px)'

const useStyles = makeStyles({
  container: {
    marginTop: 90,
	},
	list: {
    minWidth: '400px',
    '@media (max-width: 400px)': {
      minWidth: '0px',
    },
    maxHeight: viewHeight,
		overflow: 'auto',
		zIndex: 1,
		'&::-webkit-scrollbar': {
      width: '0.4em',
		},
		'&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
			// webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
			// outline: '1px solid slategrey'
		}
	},
  listMapHidden: {
    margin: '0 auto 0 auto'
  },
  listMapShown: {

  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 80,
    marginBottom: 0,
    height: viewHeight
  },
  mapToggle: {
    position: 'fixed',
    bottom: 55,
    left: 'calc(50vw - 66px)',
    width: 132,
    zIndex: 5,
  }
})

const MainApp = (props) => {
  const classes = useStyles();
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [eventSearchParams, setEventSearchParams] = useState(props.eventTypeFilters);
  const [eventTimeParam, setEventTimeParam] = useState('now');

  const setSelectedEventHelper = (id) => {
    setSelectedEvent(id)
  }

  const setEventSearchParamsHelper = (checked) => {
    setEventSearchParams(checked)
  };

  const setEventTimeHelper = (param) => {
    setEventTimeParam(param);
  }

  const mapToggleButton = useMediaQuery('(max-width: 600px');
  const mapToggleDisplay = (e) => {
    if (props.showMapOverList) {
      props.setMapHide();
    } else {
      props.setMapShow();
    };
  };
  
  return (
    <>
      <MenuBarRightDrawer 
        updateSearchParams={(checked) => setEventSearchParamsHelper(checked)}
        updateTimeParam={(param) => setEventTimeHelper(param)}
      />
      <Box className={classes.box} my={5}>
        <List
          className={`${mapToggleButton ? classes.listMapHidden : classes.listMapShown} ${classes.list}`}
          style={props.showMapOverList ? {display: 'none'} : {}}
        >
          <EventCard 
            currentSelection={selectedEvent}
            eventSearchParams={eventSearchParams}
            eventTimeParam={eventTimeParam}
            changeSelection={(id) => setSelectedEventHelper(id)}
            >
          </EventCard>
        </List>
        { (props.showMapOverList || !mapToggleButton) &&
            <GoogMap 
              currentSelection={selectedEvent} 
              changeSelection={(id) => setSelectedEventHelper(id)}
            >
            </GoogMap>
        }
        { mapToggleButton && 
          <Fab
            color="primary"
            variant="extended"
            className={classes.mapToggle}
            onClick={(e) => mapToggleDisplay()}
          >
              {props.showMapOverList ? 'show list' : 'show map'}
          </Fab>
        }
      </Box>
    </>
  );
	
};


const mapStateToProps = (state) => {
	return { 
		timeFrame: state.timeFrame,
		showMainApp: state.showMain,
    showMapOverList: state.showMapOverList,
    selectedEventIndex: state.selectedEventIndex,
    eventTypeFilters: state.eventTypeFilters
	};
};

export default connect(mapStateToProps, { setTimeAny, setTimeNow, setTimeLater, setMainApp, setMapShow, setMapHide })(MainApp);

