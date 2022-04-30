import React, {useState, createRef} from 'react';
import { StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground } from 'react-native';
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
          <Image style={styles.logo} source={require('../assets/logo.png')}/>
          <Text style = {styles.appName}>
            Signal'AMU
          </Text>
        </View>
          <View style={styles.inputView}>
            <TextInput style={styles.textInput} placeholderTextColor="#3983cd" textAlign={'center'} keyboardType="email-address" placeholder='Email' onChangeText={(userEmail) => setUserEmail(userEmail)} />
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.textInput}  placeholderTextColor="#3983cd" textAlign={'center'} placeholder='Mot de passe' secureTextEntry={true} onChangeText={(userPassword) => setUserPassword(userPassword)}/>
          </View>
        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
          <Text style={styles.loginButton}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerButton}>S'inscrire</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <TouchableOpacity>
          <Text style={styles.forgotButton}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
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
      borderRadius: 10,
      width: "90%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      alignSelf: 'center'
    },
    textInput: {
      borderColor: "black",
      width: "100%",
      borderWidth: 2,
      borderRadius: 0,
      padding: 10,
      color: "black"
    },
    loginButton:{
      marginTop:60,
      paddingTop:10,
      paddingBottom:10,
      marginLeft:60,
      marginRight:60,
      borderRadius:19,
      borderWidth: 3,
      borderColor: '#0066cc',
      textAlign: 'center'
    },
    registerButton:{
      marginTop:15,
      paddingTop:10,
      paddingBottom:10,
      marginLeft:60,
      marginRight:60,
      borderRadius:19,
      borderWidth: 3,
      borderColor: '#0066cc',
      textAlign: 'center'
    },
    forgotButton:{
      height: 30,
      marginTop: 90,
      alignItems: "center",
      color:"#0066cc",
      paddingHorizontal: 125,
      alignSelf: "center"
    },

});
