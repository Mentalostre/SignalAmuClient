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
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState(" ")
  const [userPassword, setUserPassword] = useState(" ")
  const [errorText, setErrorText] = useState({})
  const [isSubmited, setIsSubmited] = useState(false)

  return(
    <SafeAreaView style = {styles.mainBody}>
      <KeyboardAvoidingView behavior='padding'>
        <View>
          <Image style={styles.logo} source={require('../assets/Logo.png')}/>
          <Text style = {styles.appName}>
            Signal'AMU
          </Text>
        </View>
          <View style={styles.inputView}>
            <TextInput style={styles.textInput} keyboardType="email-address" placeholder='Email' onChangeText={(userEmail) => setUserEmail(userEmail)} />
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
    </SafeAreaView>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
    logo:{
      width: '35%',
      height: undefined,
      marginLeft: 125,
      aspectRatio: 1,
    },
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    appName:{
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
      fontSize: 21,
      paddingBottom: 100,
    },
    inputView: {
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      marginLeft: 55
    },
    textInput: {
      borderColor: "gray",
      width: "100%",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
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
