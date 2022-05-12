import React, { useState, useEffect, setState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { map } from "../api/map";
import WebView from "react-native-webview";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  return (
    <View style={styles.mainArea}>
      <WebView
        ref={(webViewRef) => {
          setMapRef(webViewRef);
        }}
        source={{ html: map }}
        style={styles.mapStyle}
      />
      <View style={styles.logoArea}>
        <TouchableOpacity onPress={() => setState}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.reportLogo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logoArea: {
    alignSelf: "flex-end",
    bottom: 50,
    right: 50,
  },
  reportLogo: {
    height: 90,
    width: 90,
  },
  reportButtons: {
    flexDirection: "column",
  },
  reportButton1: {
    display: "flex",
  },
  reportButton2: {
    display: "flex",
    right: 35,
  },
  reportButton3: {
    display: "flex",
  },
  mapStyle: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});

export default MapScreen;
