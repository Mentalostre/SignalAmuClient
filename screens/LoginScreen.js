import React, {useState, createRef} from 'react';
import { StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage/';


const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState(" ")
  const [userPassword, setUserPassword] = useState(" ")
  const [errorText, setErrorText] = useState({})
  const [isSubmited, setIsSubmited] = useState(false)

  return(
    <View style = {styles.mainBody}>
      <KeyboardAvoidingView enabled> 
        <View>
          <Text style={styles.logo}>TODO</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.textInput} placeholder='Email' onChangeText={(userEmail) => setUserEmail(userEmail)}/>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.textInput} placeholder='Mot de passe' secureTextEntry={true} onChangeText={(userPassword) => setUserPassword(userPassword)}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotButton}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerButton}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.loginButton}>Se connecter</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
    logo:{
      justifyContent: 'center',
      alignContent: 'center',
      marginBottom: 100,
      marginLeft: 175
    },
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    inputView: {
      backgroundColor: "#2b71ff",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      marginLeft: 55
    },
    textInput: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    forgotButton:{
      height: 30,
      marginBottom: 30,
      alignItems: "center",
      paddingHorizontal: 125,
    },
    loginButton:{
      backgroundColor: '#004ae1',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
      paddingVertical: 10,
      paddingHorizontal: 120,
    },
    registerButton:{
      backgroundColor: '#004ae1',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
      paddingVertical: 10,
      paddingHorizontal: 125,
    },
});