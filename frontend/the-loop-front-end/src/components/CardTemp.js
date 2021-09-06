import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Query query={gql`
        {
            allEvents {
                id
                name
                type {
                    type
                }
                recurring
                active
                description
                tixRequired
                tixLink
                venue {
                    name
                }
            }
        }
    `}
    >
			{({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>
						console.log(data);
            return data.allEvents.map(({id, name, type, venue, recurring, active, description, tixRequired, tixLink}) => (
                <Card className={classes.root} key={id}>
									<CardContent>
											<p>Event Type: {type[0].type}</p>
											<p>"{name}"</p>
											<p>Venue: {venue.name}</p>
											<p>Active: {active}</p>
											<p>Description: {description}</p>
											<p>Tix Required: {tixRequired}</p>
											<p>Tix Link: {tixLink}</p>
									</CardContent>
								</Card>
                    
            ))
        }}
		</Query>
  );
}