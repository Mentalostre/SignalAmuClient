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
  ImageBackground, Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage/";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/images/handphone.png")}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.titleText}>
          Prenez soin {'\n'} de votre campus
        </Text>
        <Text style={styles.aboutText}>
          Découvrez Signal’AMU, l’application qui vous permet de prendre soin de votre campus en quelques clics.
          Publier un signalement pour régler les problèmes que vous pouvez rencontrer tous les jours !
        </Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.registerText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
  },
  imageView: {
    backgroundColor: "#0066cc",
    width: screenWidth - 18,
    marginHorizontal: 9,
    marginTop: 40,
    height: screenHeight * 0.50,
    alignItems: "center",
    borderRadius: 45,
    borderWidth: 0,
    borderColor: "#fff",
  },
  imageStyle: {
    width: screenWidth - 18,
    height: screenHeight * 0.50,
  },
  textView: {
    marginTop: 10,
  },
  titleText:{
    textAlign: "center",
    fontFamily: "Outfit-Bold",
    fontSize: 30,
    padding: 10,
  },
  aboutText: {
    textAlign: "center",
    fontFamily: "Outfit-Light",
    fontSize: 13,
    padding: 30,
  },
  buttonView: {
    flex: 1,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#0066cc",
    height: 65,
    width: 170,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderWidth: 0,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  loginText: {
    paddingTop: 19,
    textAlign: "center",
    color: "#fff",
    fontFamily: "Outfit-Bold",
    fontSize: 20,
  },
  registerButton: {
    backgroundColor: "#F3F3F3",
    height: 65,
    width: 170,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  registerText: {
    paddingTop: 19,
    textAlign: "center",
    color: "#000",
    fontFamily: "Outfit-Bold",
    fontSize: 20,
  },
});

export default HomeScreen;
