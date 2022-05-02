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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage/";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/ICANT.png")}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>
          "Quand la fac ça devient tb, on est là pour vous aider"
        </Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.loginButton}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.registerButton}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  imageView: {
    alignItems: "center",
  },
  imageStyle: {},
  textView: {
    marginTop: 150,
  },
  textStyle: {
    textAlign: "center",
  },
  buttonView: {
    marginTop: 150,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#0066cc",
    color: "#fff",
    height: 77,
    width: 170,
    textAlign: "center",
    paddingTop: 30,
  },
  registerButton: {
    marginBottom: 1,
    paddingTop: 30,
    backgroundColor: "#cacbcd",
    color: "#000",
    height: 75,
    width: 170,
    textAlign: "center",
  },
});

export default HomeScreen;
