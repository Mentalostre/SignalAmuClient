import React from 'react';
import { Text, View, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
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

export default HomeScreen