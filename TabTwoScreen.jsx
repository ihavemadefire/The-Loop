import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import { gql } from "@apollo/client";
import client from "../components/client";
import Places from "../components/Places";
import Markers from "../components/Markers";

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

export default class TabTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.route.params.activity,
      index: 0,
      animation: new Animated.Value(0),
      markers: [],
    };
  }

  async componentDidMount() {
    await this.updatePlaces();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.route.params.activity !== this.props.route.params.activity) {
      this.setState(
        (state, props) => ({ activity: this.props.route.params.activity }),
        async () => {
          await this.updatePlaces();
        }
      );
    }
  }

  async updatePlaces() {
    if (this.state.activity !== "Event") {
      client
        .query({
          query: MARKERS_QUERY,
        })
        .then((result) => {
          this.setState(
            (state, props) => ({
              markers: result.data.allPlaces.filter(
                ({ type }) => type.type === this.state.activity
              ),
              region: {
                latitude: result.data.allPlaces.filter(
                  ({ type }) => type.type === this.state.activity
                )[0].lat,
                longitude: result.data.allPlaces.filter(
                  ({ type }) => type.type === this.state.activity
                )[0].long,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
              },
            }),
            async () => {
              this.state.animation.addListener(({ value }) => {
                let index = Math.floor(value / CARD_WIDTH + 0.3);
                if (index >= this.state.markers.length) {
                  index = this.state.markers.length - 1;
                }
                if (index <= 0) {
                  index = 0;
                }

                clearTimeout(this.regionTimeout);
                this.regionTimeout = setTimeout(() => {
                  const { lat } = this.state.markers[index];
                  const { long } = this.state.markers[index];
                  const coordinate = { latitude: lat, longitude: long };
                  this.map.animateToRegion(
                    {
                      ...coordinate,
                      latitudeDelta: 0.025,
                      longitudeDelta: 0.025,
                    },
                    350
                  );
                }, 10);
              });
              clearTimeout(this.regionTimeout);
              this.regionTimeout = setTimeout(() => {
                const { lat } = this.state.markers[0];
                const { long } = this.state.markers[0];
                const coordinate = { latitude: lat, longitude: long };
                this.map.animateToRegion(
                  {
                    ...coordinate,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                  },
                  350
                );
              });
            }
          );
        });
    } else {
      client
        .query({
          query: EVENTS_QUERY,
        })
        .then((result) => {
          this.setState(
            (state, props) => ({
              markers: result.data.allEvents,
              region: {
                latitude: result.data.allEvents[0].venue.lat,
                longitude: result.data.allEvents[0].venue.long,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
              },
            }),
            async () => {
              this.state.animation.addListener(({ value }) => {
                let index = Math.floor(value / CARD_WIDTH + 0.3);
                if (index >= this.state.markers.length) {
                  index = this.state.markers.length - 1;
                }
                if (index <= 0) {
                  index = 0;
                }

                clearTimeout(this.regionTimeout);
                this.regionTimeout = setTimeout(() => {
                  const { lat } = this.state.markers[index].venue;
                  const { long } = this.state.markers[index].venue;
                  const coordinate = { latitude: lat, longitude: long };
                  this.map.animateToRegion(
                    {
                      ...coordinate,
                      latitudeDelta: 0.025,
                      longitudeDelta: 0.025,
                    },
                    350
                  );
                }, 10);
              });
              clearTimeout(this.regionTimeout);
              this.regionTimeout = setTimeout(() => {
                const { lat } = this.state.markers[0].venue;
                const { long } = this.state.markers[0].venue;
                const coordinate = { latitude: lat, longitude: long };
                this.map.animateToRegion(
                  {
                    ...coordinate,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                  },
                  350
                );
              });
            }
          );
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
          showsUserLocation={true}
          showsPointsOfInterest={false}
        >
          <Markers
            index={this.state.index}
            animation={this.state.animation}
            activity={this.state.activity}
          />
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          decelerationRate={"fast"}
          pagingEnabled
          snapToAlignment={"center"}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={{
            width: `${100 * this.state.markers.length}%`,
          }}
        >
          <Places activity={this.state.activity} />
        </Animated.ScrollView>
      </View>
    );
  }
}

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
  markerWrap: {
    alignItems: "center",
    justifyContent: "space-between",
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

AppRegistry.registerComponent("mapfocus", () => TabTwo);
