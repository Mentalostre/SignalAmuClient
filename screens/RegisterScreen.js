import React, {useState, createRef} from 'react';
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
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const RegisterScreen = ({navigation}) => {
    const [userEmail, setUserEmail] = useState(" ")
    const [userPassword, setUserPassword] = useState(" ")
    const [errorText, setErrorText] = useState({})
    const [isSubmited, setIsSubmited] = useState(false)
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    return(
        <SafeAreaView style = {styles.mainBody}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconStyle}>
            <AntDesign name="arrowleft" size={32} color="#0066cc"/>
          </TouchableOpacity>
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
              <TextInput style={styles.textInput} placeholderTextColor="#3983cd" textAlign={'center'} keyboardType="email-address" placeholder="Confirmer l'adresse email" onChangeText={(userEmail) => setUserEmail(userEmail)} />
            </View>
            <View style={styles.inputView}>
              <TextInput style={styles.textInput} placeholderTextColor="#3983cd" textAlign={'center'} placeholder='Mot de passe' secureTextEntry={true} onChangeText={(userPassword) => setUserPassword(userPassword)}/>
            </View>
            <View style={styles.inputView}>
              <TextInput style={styles.textInput} placeholderTextColor="#3983cd" textAlign={'center'} placeholder='Confirmer le mot de passe' secureTextEntry={true} onChangeText={(userPassword) => setUserPassword(userPassword)}/>
            </View>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.registerButton}>S'inscrire</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
}

export default RegisterScreen;

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
        fontWeight: 'bold',
        fontSize: 18,
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
        borderRadius: 150,
        padding: 10,
        color: "black",
      },
      registerButton:{
        marginTop:60,
        paddingTop:10,
        paddingBottom:10,
        marginLeft:60,
        marginRight:60,
        borderRadius:10,
        borderWidth: 3,
        borderColor: '#0066cc',
        textAlign: 'center'
      },
      iconStyle:{
        marginTop: -90,
        marginLeft: 15
      }
})