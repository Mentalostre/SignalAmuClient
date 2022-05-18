import React, { useState } from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import * as Location from 'expo-location'
import {TouchableOpacity} from "react-native-gesture-handler";
import { map } from "../api/map";
import WebView from "react-native-webview";





const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState({});
    const [mapRef, setMapRef] = useState(null);
    const [mapRegion, setmapRegion] = useState({

    latitude: 43.23205,
    longitude: 5.43915,
    latitudeDelta: 0.01335,
    longitudeDelta: 0.00795,
  });
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
              <TouchableOpacity>
                  <Image
                      source={require("../assets/images/logo.png")}
                      style={styles.reportLogo}
                  />
              </TouchableOpacity>
          </View>

      </View>
  );
};

export default MapScreen;


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    mainArea: {
        flex: 1,
        justifyContent: "flex-end",
    },
    logoArea: {
        position: "absolute",
        alignSelf: "flex-end",
        bottom: 30,
        right: 30,
    },
    reportLogo: {
        height: 70,
        width: 70,
    },
    mapStyle: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
});
