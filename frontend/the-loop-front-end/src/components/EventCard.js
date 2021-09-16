import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';

import chronologicalSort from './helpers/chronoSort.js';
import { COLORS } from '../styles/colors.js'
import DetailPop from './menus/DetailPop.js';
import { setCurrentData, setHighlightedIndex, clearResultsData, addResultsData } from '../actions/index.js';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
		color: COLORS.darkBlue,
  },
  listItem: {
    width: '100%'
  },
	card: {
    width: '100%',
	},
  cardSelected: {
    border: `1px solid ${COLORS.darkBlue}`,
    width: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
	content: {
		padding: 10,
		paddingBottom: 10,
		
	},
	type: {
		fontWeight: 500,
		color: COLORS.regRed,
	},
	name: {
		fontWeight: 700,
		color: COLORS.darkBlue,
		fontSize: '1.2rem'
	},
	shortDescription: {
		color: COLORS.darkBlue,
		fontWeight: 300,
		marginBottom: 10,
	},
	inlineInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	subHeading: {
		fontWeight: 300,
	},
	venueLink: {
		fontWeight: 500,
		color: COLORS.darkBlue,
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
  noResults: {
    padding: '0 1rem 0 1rem',
  }
});

const EventCard = (props) => {
  const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(props.currentSelection);
  const [searchParams, setSearchParams] = useState([])

  useEffect(() => {
    setSelectedIndex(props.currentSelection);
  }, [props.currentSelection]);

  useEffect(() => {
    setSearchParams(props.eventSearchParams);
  }, [props.eventSearchParams])

  useEffect(() => {
    //console.log(`EventCard timeframe: ${props.eventTimeParam}`)
  }, [props.eventTimeParam])

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.setHighlightedIndex(index);
    props.changeSelection(index);
  };

	const query = gql`
		{
			allEvents {
				id
				name
				type {
					type
				}
				description
        shortDescription
        when
        end
				venue {
					id
					name
					address
					phoneNumber
					price
          shortDescription
					description
					type {
						type
					}
					amenities {
						id
						amenity
					}
					subtype {
						subtype
					}
          lat
          long
				}
			}
		}
	`
  const NoResultsHelper = () => {
    return (
      <ListItem>
        <Card className={classes.card}>
          <p className={classes.noResults}>No search results for currently selected filters.</p>
        </Card>
      </ListItem>
    )
  };

  const dayFormatter = (time) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const todayFlair = 'TODAY!';
    const dayIsToday = (time.toDateString() === today.toDateString())
    const dayString = `${days[time.getDay()]} ${month[time.getMonth()]} ${time.getDate()}`
    //return (dayIsToday ? todayFlair : dayString);
    return dayString;
  };

  const timeFormatter = (eventStartTime) => {
    const today = new Date();
    const startedFlair = ` (started at ${eventStartTime.toLocaleTimeString()})`;
    const dayIsToday = (eventStartTime.toDateString() === today.toDateString())
    if (dayIsToday && (eventStartTime.getTime() < today.getTime())) {
      return startedFlair;
    } 
    const timeString = ` - ${eventStartTime.toLocaleTimeString()}`
    return timeString;
  };

  const {loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <NoResultsHelper />
  
  props.setCurrentData(data.allEvents);
  props.clearResultsData();

  console.log('All events:______________')
  console.log(data.allEvents);
  console.log('___________________________')

  const eventsSorted = chronologicalSort(data.allEvents);

  return eventsSorted.map((loopEvent) => {
    if (searchParams.includes(loopEvent.type[0].type.toLowerCase()) || searchParams.length === 0) {
      const currentTime = new Date();
      const eventTime = new Date(loopEvent.when)
      const eventDay = eventTime.toDateString();
      const today = currentTime.toDateString();
      const eventStartTime = eventTime.toTimeString();
      const timeNow = currentTime.toTimeString();
      const timeParam = props.eventTimeParam;
      
      // console.log(`Now:     ${currentTime.toTimeString()}`);
      // console.log(`Event:   ${eventTime.toTimeString()}`);
      // console.log(`Is it going on now: ${eventStartTime < timeNow}`);
      // console.log(`Now:     ${currentTime.toDateString()}`);
      // console.log(`Event:   ${eventTime.toDateString()}`);
      // console.log(`Is date today: ${eventDay === today}`);
      // console.log(`Is date today or later: ${eventDay >= today}`);
      // console.log(`Time period: ${props.eventTimeParam}`)
      // console.log(loopEvent);
      // if (timeParam === 'anytime') {
      //   if (eventTime.getTime() < currentTime.getTime()) return null;
      // };

      if (timeParam === 'now') {
        if (eventDay !== today || eventStartTime > timeNow) {
          return null;
        };
      };
      
      if (timeParam === 'later') {
        if (eventDay !== today) return null;
      };
      
      props.addResultsData(loopEvent);
      return (
        <ListItem
          button
          className={classes.listItem}
          selected={selectedIndex === loopEvent.id}
          key={loopEvent.id}
          onClick={(event) => handleListItemClick(event, loopEvent.id)}
        >
          <Card 
            className={(selectedIndex === loopEvent.id) ? classes.cardSelected : classes.card}
            key={loopEvent.id}
          >
            <div className={classes.content}>
              <div className={classes.cardHeader}>
                <div>
                  <div className={classes.type}>{loopEvent.type[0].type}</div>
                  <div className={classes.name}>{loopEvent.name}</div>
                </div>
                <DetailPop detailType='event' venue={loopEvent}/>
              </div>
              <div className={classes.shortDescription}>{loopEvent.shortDescription}</div>
              <div className={classes.inlineInfo}>
                <div className={classes.subHeading}>Where:</div>
                <DetailPop detailType='venue' details={loopEvent.venue}/>
              </div>
              <div className={classes.inlineInfo}>
                <div className={classes.subHeading}>When:</div>
                <div className={classes.subInfo}>
                  {dayFormatter(eventTime)}{timeFormatter(eventTime)}
                </div>
              </div>
            </div>
          </Card>
        </ListItem>
      )
    } else if (searchParams.length) {
      return null;
    }
    return (
      <NoResultsHelper />
    );
  }
  );
};

const mapStateToProps = (state) => {
  return {
    currentData: state.currentDataSet,
    eventTypeFilters: state.eventTypeFilters,
  };
};

export default connect(mapStateToProps, { setCurrentData, setHighlightedIndex, clearResultsData, addResultsData})(EventCard);
