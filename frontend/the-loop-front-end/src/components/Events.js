import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Events = () => (
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
            return data.allEvents.map(({id, name, type, venue, recurring, active, description, tixRequired, tixLink}) => (
                <div key={id}>
                    <h2>{name}</h2>
                    <p>{type.type}</p>
                    <p>{venue.name}</p>
                    <p>{recurring}</p>
                    <p>{active}</p>
                    <p>{description}</p>
                    <p>{tixRequired}</p>
                    <p>{tixLink}</p>
                </div>
            ))
        }}
    </Query>

);

export default Events;