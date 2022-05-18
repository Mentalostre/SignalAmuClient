import React, { useState } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location'




const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState({});
  const [mapRegion, setmapRegion] = useState({
    latitude: 43.23205,
    longitude: 5.43915,
    latitudeDelta: 0.01335,
    longitudeDelta: 0.00795,
  });
  return (
      <View>
        <MapView style={{ alignSelf: 'stretch', height: '100%' }} region={mapRegion}>
          <Marker coordinate={mapRegion} title='Marker' />
        </MapView>
      </View>
  );
};

export default MapScreen;


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

});
