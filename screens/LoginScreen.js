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
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(" ");
  const [userPassword, setUserPassword] = useState(" ");
  const [errorText, setErrorText] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  return (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.backButtonView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonStyle}
        >
          <AntDesign name="arrowleft" size={32} color="#0066cc" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.logoView}>
          <Image
            style={styles.logoStyle}
            source={require("../assets/logo.png")}
          />
          <Text style={styles.appNameStyle}>Signal'AMU</Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#3983cd"
            textAlign={"center"}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(userEmail) => setUserEmail(userEmail)}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#3983cd"
            textAlign={"center"}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
          <Text style={styles.loginButtonStyle}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.registerButtonStyle}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotButtonStyle}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  backButtonView: {
    marginLeft: 20,
  },
  backButtonStyle: {},
  logoView: {},
  logoStyle: {
    width: "35%",
    height: undefined,
    marginLeft: 125,
    aspectRatio: 1,
  },
  appNameStyle: {
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 21,
    paddingBottom: 100,
  },

  textInputView: {
    width: "90%",
    height: 55,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },

  textInputStyle: {
    borderColor: "black",
    width: "100%",
    borderWidth: 2,
    borderRadius: 0,
    padding: 10,
    color: "black",
    margin: 5,
  },

  buttonView: {
    marginTop: 50,
  },

  loginButtonStyle: {
    marginTop: 60,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: "#0066cc",
    textAlign: "center",
  },
  registerButtonStyle: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: "#0066cc",
    textAlign: "center",
  },
  forgotButtonStyle: {
    height: 30,
    marginTop: 90,
    alignItems: "center",
    color: "#0066cc",
    paddingHorizontal: 125,
    alignSelf: "center",
  },
});
