import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import FlipCard from "react-native-flip-card";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height * 0.3;
const CARD_WIDTH = width * 0.9;

const PLACES_QUERY = gql`
  query GetPlaces {
    allPlaces {
      id
      name
      address
      description
      shortDescription
      phoneNumber
      lat
      long
      image
      type {
        type
      }
      district {
        district
      }
    }
  }
`;

const EVENTS_QUERY = gql`
  query GetEvents {
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
        lat
        long
        image
        district {
          district
        }
      }
    }
  }
`;

const makeCall = (phoneNumber) => {
  Linking.openURL(`telprompt:${phoneNumber}`);
};

const openLink = (link) => {
  Linking.openURL(link);
};

const navigateTo = (lat, long) => {
  Linking.openURL(`maps:0,0?q=${lat},${long}`);
};

const Places = ({ activity }) => {
  if (activity !== "Event") {
    const { loading, error, data } = useQuery(PLACES_QUERY);
    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View>
          <Text>Error {error.message}</Text>
        </View>
      );
    }
    return data.allPlaces
      .filter(({ type }) => type.type === activity)
      .map(
        ({
          id,
          name,
          address,
          phoneNumber,
          image,
          description,
          shortDescription,
          district,
          type,
          lat,
          long,
        }) => (
          <View key={id}>
            <FlipCard useNativeDriver={true}>
              {/* Face Side */}
              <View style={styles.card}>
                <Image
                  source={{
                    uri: image,
                    cache: "force-cache",
                  }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {name}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {address}
                </Text>
              </View>
              {/* Back Side */}
              <View style={styles.card}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {name}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {type.type}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  District: {district.district}
                </Text>
                <Text numberOfLines={3} style={styles.cardDescription}>
                  {description}
                </Text>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => makeCall(phoneNumber)}
                >
                  <Text style={styles.callButtonText}>Call {name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={() => navigateTo(lat, long)}
                >
                  <Text style={styles.navigateButtonText}>
                    Navigate to {name}
                  </Text>
                </TouchableOpacity>
              </View>
            </FlipCard>
          </View>
        )
      );
  } else {
    const { loading, error, data } = useQuery(EVENTS_QUERY);
    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View>
          <Text>Error {error.message}</Text>
        </View>
      );
    }
    return data.allEvents.map(
      ({ id, name, type, description, tixLink, venue }) => (
        <View key={id}>
          <FlipCard useNativeDriver={true}>
            {/* Face Side */}
            <View style={styles.card}>
              <Image
                source={{
                  uri: venue.image,
                  cache: "force-cache",
                }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text numberOfLines={1} style={styles.cardtitle}>
                {name}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {venue.name}
              </Text>
            </View>
            {/* Back Side */}
            <View style={styles.card}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {name}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                Event Type: {type[0].type}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                District: {venue.district.district}
              </Text>
              <Text numberOfLines={3} style={styles.cardDescription}>
                {description}
              </Text>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => openLink(tixLink)}
              >
                <Text style={styles.callButtonText}>Get tickets</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => navigateTo(venue.lat, venue.long)}
              >
                <Text style={styles.navigateButtonText}>
                  Navigate to {venue.name}
                </Text>
              </TouchableOpacity>
            </View>
          </FlipCard>
        </View>
      )
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    paddingBottom: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: width * 0.05,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
    paddingHorizontal: 10,
  },
  callButton: {
    padding: 10,
    marginVertical: 3.5,
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: "rgba(13, 39, 71, 0.9)",
    alignSelf: "flex-start",
  },
  callButtonText: {
    color: "white",
  },
  navigateButton: {
    padding: 10,
    marginVertical: 3.5,
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: "rgba(200, 27, 42, 0.9)",
    alignSelf: "flex-start",
  },
  navigateButtonText: {
    color: "white",
  },
});

export default Places;
