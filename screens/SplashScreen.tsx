import React from "react";
import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.navigate("Auth");
    }, 2000);
  }, []);

  /*TODO QUAND Y'AURA L'AUTH

    const [animating, setAnimating] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            AsyncStorage.getItem('user_id').then((value) =>
                navigation.replace(
                    'Auth'
                ),
            );
        }, 2000);
    }, []);

    */

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      <Image
        style={styles.splashImage}
        source={require("../assets/images/logo.png")}
      />
      <Text style={styles.logo}>Signal’AMU</Text>
      <Text style={styles.copyrightText}>
        © Copyright Signal’AMU 2022. All rights reserved
      </Text>
    </View>
  );
};

export default SplashScreen;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  splashImage: {
    position: "absolute",
    top: "25%",
    height: 166,
    width: 166,
  },
  copyrightText: {
    position: "absolute",
    maxWidth: 330,
    textAlign: "center",
    fontFamily: "Roboto-Light",
    fontSize: 14,
    color: "#000000",
    bottom: 20,
  },
  logo: {
    position: "absolute",
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 28,
    color: "#0066cc",
  },
});
