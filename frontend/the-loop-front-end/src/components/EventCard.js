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
import { dayFormatter, startTimeFormatter, endTimeFormatter } from './helpers/timeFormatters.js';
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
          image
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

  

  const {loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <NoResultsHelper />
  
  props.setCurrentData(data.allEvents);
  props.clearResultsData();

  // Removes ended events, sets order by start time with events ending soon at the top
  const eventsSorted = chronologicalSort(data.allEvents);

  return eventsSorted.map((loopEvent) => {
    if (searchParams.includes(loopEvent.type[0].type.toLowerCase()) || searchParams.length === 0) {
      const currentTime = new Date();
      const eventStartTime = new Date(loopEvent.when)
      const eventEndTime = new Date(loopEvent.end)
      const timeParam = props.eventTimeParam;
      
      const hoursUntilStart = (eventStartTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);
      //console.log("hours until start event");
      //console.log(hoursUntilStart);
      
      if (timeParam === 'now') {
        if (hoursUntilStart > 2) {
          return null;
        };
      };
      
      if (timeParam === 'later') {
        if (hoursUntilStart < 2) return null;
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
                  {dayFormatter(eventStartTime)}
                </div>
              </div>
              <div className={classes.inlineInfo}>
                <div className={classes.subHeading}></div>
                <div className={classes.subInfo}>
                  {startTimeFormatter(eventStartTime)}
                </div>
              </div>
              <div className={classes.inlineInfo}>
                <div className={classes.subHeading}></div>
                <div className={classes.subInfo}>
                  {endTimeFormatter(eventEndTime)}
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
