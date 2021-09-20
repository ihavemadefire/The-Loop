import React from "react";
import { gql, useQuery } from "@apollo/client";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import MapView from "react-native-maps";

const MARKERS_QUERY = gql`
  query GetPlaces {
    allPlaces {
      id
      name
      address
      phoneNumber
      lat
      long
      type {
        type
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
        id
        name
        lat
        long
        image
      }
    }
  }
`;

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.9;

const Markers = ({ animation, activity }) => {
  const { loading: placesLoading, error: placesError, data: placesData } = useQuery(MARKERS_QUERY);
  const { loading: eventsLoading, error: eventsError, data: eventsData } = useQuery(EVENTS_QUERY);

  if (placesLoading || eventsLoading) {
    return null;
  }
  if (placesError || eventsError) {
    return (
      <View>
        <Text>Error {error.message}</Text>
      </View>
    );
  }

  if (activity !== "Event") {
    const interpolations = placesData.allPlaces.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];
      const scale = animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    return placesData.allPlaces
      .filter(({ type }) => type.type === activity)
      .map(({ id, lat, long }, index) => {
        const scaleStyle = {
          transform: [
            {
              scale: interpolations[index].scale,
            },
          ],
        };
        const opacityStyle = {
          opacity: interpolations[index].opacity,
        };
        return (
          <MapView.Marker
            key={id}
            coordinate={{
              latitude: lat,
              longitude: long,
            }}
          >
            <Animated.View style={[styles.markerWrap, opacityStyle]}>
              <Animated.View style={[styles.ring, scaleStyle]} />
              <View style={styles.marker} />
            </Animated.View>
          </MapView.Marker>
        );
      });
  } else {
    const interpolations = eventsData.allEvents.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];
      const scale = animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    return eventsData.allEvents.map(({ venue }, index) => {
      const scaleStyle = {
        transform: [
          {
            scale: interpolations[index].scale,
          },
        ],
      };
      const opacityStyle = {
        opacity: interpolations[index].opacity,
      };
      return (
        <MapView.Marker
          key={index}
          coordinate={{
            latitude: venue.lat,
            longitude: venue.long,
          }}
        >
          <Animated.View style={[styles.markerWrap, opacityStyle]}>
            <Animated.View style={[styles.ring, scaleStyle]} />
            <View style={styles.marker} />
          </Animated.View>
        </MapView.Marker>
      );
    });
  }
};

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(13, 39, 71, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(13, 39, 71, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(13, 39, 71, 0.5)",
  },
});

export default Markers;
