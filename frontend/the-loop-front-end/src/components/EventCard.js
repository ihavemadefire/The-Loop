import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';

import { COLORS } from '../styles/colors.js'
import DetailPop from './menus/DetailPop.js';
import { setCurrentData, setHighlightedIndex } from '../actions/index.js';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
		color: COLORS.darkBlue,
  },
	card: {
		marginBottom: 5,
    width: '100%',
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
	}
});

const EventCard = (props) => {
  const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState(props.currentSelection);

  useEffect(() => {
    setSelectedIndex(props.currentSelection);
  }, [props.currentSelection]);

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
  return (
    <Query query={query}>
			{({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>No results for search parameters...</p>
            props.setCurrentData(data.allEvents);
            return data.allEvents.map((loopEvent) => (
                <ListItem
									button
									selected={selectedIndex === loopEvent.id}
                  key={loopEvent.id}
									onClick={(event) => handleListItemClick(event, loopEvent.id)}
								>
									<Card className={classes.card} key={loopEvent.id}>
										<div className={classes.content}>
											<div className={classes.cardHeader}>
												<div>
													<div className={classes.type}>{loopEvent.type[0].type}</div>
													<div className={classes.name}>{loopEvent.name}</div>
												</div>
												<DetailPop detailType='event' venue={loopEvent}/>
											</div>
											<div className={classes.shortDescription}>Short description describing what this thing is.</div>
											<div className={classes.inlineInfo}>
												<div className={classes.subHeading}>Where:</div>
												<DetailPop detailType='venue' details={loopEvent.venue}/>
											</div>
											<div className={classes.inlineInfo}>
												<div className={classes.subHeading}>When:</div>
												<div className={classes.subInfo}>9:00pm - 12:30am</div>
											</div>
										</div>
									</Card>
								</ListItem>
                    
            ))
        }}
		</Query>
  );
};

const mapStateToProps = (state) => {
  return {
    currentData: state.currentDataSet,
  };
};

export default connect(mapStateToProps, { setCurrentData, setHighlightedIndex })(EventCard);
