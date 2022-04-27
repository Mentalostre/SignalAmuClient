import React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = ({navigation}) => {

    const [timePassed, setTimePassed] = useState(false);
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        navigation.navigate('Auth');
      }, 2000);
    }, []);



    /*TODO QUAND Y'AURA L'AUTH
    
    const [animating, setAnimating] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            AsyncStorage.getItem('user_id').then((value) =>
                navigation.replace(
                    'Auth'
                ),
            );
        }, 2000);
    }, []);
    
    */

    return (
        <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#307ecc',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
  });