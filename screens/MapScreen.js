import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

const MapScreen = ({navigation}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() =>  {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                setErrorMsg('Denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location)
        })();
    }, []); 







    return(
        <View style={styles.mainArea}>
            <View style={styles.logoArea}>
                <TouchableOpacity onPress={() => navigation.navigate("ReportScreen")}>
                    <Image source={require("../assets/logo.png")} style={styles.reportLogo}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainArea:{
        flex: 1,
        justifyContent: "flex-end",
    },
    logoArea:{
        alignSelf:'flex-end',
        bottom:50,
        right:50
    },
    reportLogo:{
        height: 90,
        width: 90,
    }
})

export default MapScreen;