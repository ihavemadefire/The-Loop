import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Picker } from "@react-native-community/picker";

const nighttime =
  "https://the-loop-images.s3.amazonaws.com/photo-1504847859802-50699996783c.jpeg";
const logoURL = "https://the-loop-images.s3.amazonaws.com/loop_logo.svg";
const { height, width } = Dimensions.get("window");

export default function TabOneScreen({ navigation }) {
  const [activity, setActivity] = useState("Event");

  return (
    <View>
      <ImageBackground
        source={{ uri: nighttime }}
        style={styles.backgroundImage}
      >
        <Text style={styles.pickerPromptText}>I'm looking for</Text>
        <Picker
          selectedValue={activity}
          style={{ height: 50 }}
          itemStyle={styles.pickerStyle}
          mode={"dropdown"}
          onValueChange={(itemValue) => setActivity(itemValue)}
        >
          <Picker.Item label="Events" value="Event" />
          <Picker.Item label="Restaurants" value="Restaurant" />
          <Picker.Item label="Public Parks" value="Public Park" />
          <Picker.Item label="Venues" value="Arena" />
          <Picker.Item label="Breweries" value="Brewery" />
        </Picker>
        <Pressable
          style={styles.randomButton}
          onPress={() => {
            navigation.navigate("TabTwo", { activity: activity });
          }}
        >
          <Text style={styles.randomButtonText}>Get in The Loop</Text>
        </Pressable>
        <Image
          source={{ uri: logoURL }}
          style={{ height: height * 0.3, width: width * 0.5 }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: "contain",
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: width * 0.8,
    height: 50,
    marginTop: 20,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  randomText: {
    color: "white",
  },
  randomTextTop: {
    marginTop: 175,
  },
  randomButton: {
    backgroundColor: "rgba(13, 39, 71, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: width * 0.7,
    height: 50,
    flexDirection: "row",
    marginTop: 125,
  },
  randomButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  pickerPromptText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
  pickerStyle: {
    backgroundColor: "rgba(200, 27, 42, 0.7)",
    borderRadius: 10,
    marginTop: 15,
    color: "white",
    height: 50,
    width: width * 0.7,
  },
  image: {
    height: height * 0.3,
    width: width * 0.5,
  },
});
