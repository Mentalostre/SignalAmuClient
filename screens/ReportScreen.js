import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  FlatList,
} from "react-native";

const ReportScreen = ({ navigation }) => {
  return (
    <View style={styles.mainBody}>
      <Text>Incident n°1</Text>
      <Text>Incident n°2</Text>
      <Text>Incident n°3</Text>
      <Text>Incident n°4 c pas fini zebi</Text>
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  itemStyle: {},
});
