# The Loop Backend

## How to use the schema

Currently the schema has 4 queries in it

1. allPlaces - Returns a list of all places with attributes available.  A full schema querry would look like this:
```{
  allPlaces {
    id
    name
    address
    description
    phoneNumber
    price
    openNow
    district {
      id
    }
    amenities {
      amenity
    }
    type {
      type
    }
    subtype {
      subtype
    }
  }
}```

2. allEvents - Returns a list of all places with attributes available.  A full schema querry would look like this:
```
{
  allEvents {
    id
    name
    type {
      type
    }
    venue {
      name
    }
    recurring
    active
    description
    tixRequired
    tixLink
  }
}
```
3. onePlace - Allows for the query of one place with the id as passed variable. The fields are the same as the allPlaces, but takes in the id variable like so:
```
{
  oneEvent(id:1){
    id
    name
    type {
      type
    }
    ...
  }
}
```
4. oneEvent - As with one Place, the id is passed to get one event.
```
{
  onePlace(id:1){
    name
    address
    description
  }
}
```

Note: as of now, the querries do not include time parameters. They involve subquerying in a way that isn't immediately clear. Queries with filtering on subfields are coming in the near future.