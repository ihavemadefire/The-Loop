import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { COLORS } from '../styles/colors.js'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
		color: COLORS.darkBlue,
  },
	card: {
		maxWidth: 400,
		marginBottom: 5,
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
	subInfo: {
		fontWeight: 500,
		color: COLORS.darkBlue,
	}
});

export default function SimpleCard() {
  const classes = useStyles();

	const venueClick = (venue) => {
		console.log(venue);
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
					description
				}
			}
		}
	`
  return (
    <Query query={query}>
			{({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>I have a bad feeling about this...</p>
						console.log(data);
            return data.allEvents.map(({id, name, type, venue, recurring, active, description, tixRequired, tixLink}) => (
                <Card className={classes.card} key={id}>
									<div className={classes.content}>
											<div className={classes.type}>{type[0].type}</div>
											<div className={classes.name}>{name}</div>
											<div className={classes.shortDescription}>Short description describing what this thing is.</div>
											<div className={classes.inlineInfo}>
												<div className={classes.subHeading}>Where:</div>
												<Link  href="#" className={classes.subInfo} onClick={() => venueClick(venue)}>{venue.name}</Link>
											</div>
											<div className={classes.inlineInfo}>
												<div className={classes.subHeading}>When:</div>
												<div className={classes.subInfo}>9:00pm - 12:30am</div>
											</div>
											{/* <Typography>Tix Required: {tixRequired}</Typography> */}
											{/* <Typography>Tix Link: {tixLink}</Typography> */}
											{/* <Typography>Description: {description}</Typography> */}
									</div>
								</Card>
                    
            ))
        }}
		</Query>
  );
}