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
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { handleSignupPost } from "../api/signup";

const RegisterScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(" ");
  const [userPassword, setUserPassword] = useState(" ");
  return (
    <View style={styles.mainBody}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.logoView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonStyle}
          >
            <AntDesign name="arrowleft" size={32} color="#0066cc" />
          </TouchableOpacity>
          <Image
            style={styles.logoStyle}
            source={require("../assets/images/logo.png")}
          />
          <Text style={styles.appNameStyle}> Signal 'AMU</Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#3983cd"
            textAlign={"left"}
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(userEmail) => setUserEmail(userEmail)}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#3983cd"
            textAlign={"left"}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#3983cd"
            textAlign={"left"}
            placeholder="Confirmer le mot de passe"
            secureTextEntry={true}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={async () => {
          let result = await handleSignupPost(userEmail, userPassword);
          switch (result) {
            case 1:
              navigation.navigate("LoginScreen");
              alert("Validez votre email pour pouvoir vous connecter");
              break;
            case 50:
              alert("Veillez à remplir tous les champs");
              break;
            case 25:
              alert("Veuillez rentrer une email de la faculté valide");
              break;
            case 100:
              alert("Cette adresse mail est déjà utilisée");
              break;
            default:
              alert("ERROR");
              break;
          }
        }}
      >
        <Text style={styles.registerButton}> S'inscrire</Text>
      </TouchableOpacity>
      <View style={styles.alreadyView}>
        <LinearGradient
          colors={["#FFFFFF", "#0066CC"]}
          style={styles.alreadyLeft}
          start={[0, 0]}
          end={[1, 0]}
        >
          <Text> </Text>
        </LinearGradient>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.alreadyButtonStyle}> Déjà inscrit ? </Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#0066CC", "#FFFFFF"]}
          style={styles.alreadyRight}
          start={[0, 0]}
          end={[1, 0]}
        >
          <Text> </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default RegisterScreen;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainBody: {},
  backButtonStyle: {
    position: "absolute",
    left: 20,
  },
  logoView: {
    marginTop: 50,
    alignItems: "center",
  },
  logoStyle: {
    width: 100,
    height: 100,
  },
  appNameStyle: {
    textAlign: "center",
    fontFamily: "Outfit-Bold",
    fontSize: 30,
    paddingBottom: 50,
  },
  textInputView: {
    alignSelf: "center",
  },
  textInputStyle: {
    width: screenWidth - 50,
    borderWidth: 0,
    borderRadius: 15,
    padding: 20,
    backgroundColor: "#F3F3F3",
    marginTop: 20,
    height: 60,
    fontFamily: "Outfit-Medium",
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  registerButton: {
    width: screenWidth - 50,
    borderWidth: 0,
    borderRadius: 15,
    overflow: "hidden",
    paddingTop: 16,
    backgroundColor: "#0066CC",
    marginTop: 20,
    height: 60,
    fontFamily: "Outfit-Bold",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    textAlign: "center",
    alignSelf: "center",
    color: "#ffffff",
  },
  alreadyLeft: {
    height: 3,
    width: screenWidth / 2 - 100,
    marginTop: 20,
    marginLeft: 20,
  },
  alreadyRight: {
    height: 3,
    width: screenWidth / 2 - 100,
    marginTop: 20,
    marginRight: 20,
  },
  alreadyView: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
  },
  alreadyButtonStyle: {
    margin: 12,
  },
});
