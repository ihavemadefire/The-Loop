import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Places = () => (
    <Query query={gql`
        {
            allPlaces {
                id
                name
                address
                phoneNumber
            }
        }
    `}
    >
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>
            return data.allPlaces.map(({id, name, address, phoneNumber}) => (
                <div key={id}>
                    <h2>{name}</h2>
                    <p>{address}</p>
                    <p>{phoneNumber}</p>
                </div>
            ))
        }}
    </Query>

);

export default Places;