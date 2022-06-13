import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();

import LottieView from "lottie-react-native";
import SettingsScreen from "../screens/SettingsScreen";
import MapScreen from "../screens/MapScreen";
import InfoScreen from "../screens/InfoScreen";
import {addListener} from "expo-updates";


const TabNavigator = () => {
    return (
            <Tabs.Navigator screenOptions={{headerShown:false}}>
                <Tabs.Screen name="Home" component={MapScreen} options={{tabBarLabelStyle: {display: "none"}, tabBarIcon: ({ focused, color, size }) => {
                        return <CustomTab focused={focused} color={color} size={size} route={MapScreen}/>
                    }}}/>
                <Tabs.Screen name="Settings" component={SettingsScreen} options={{tabBarLabelStyle: {display: "none"}, tabBarIcon: ({ focused, color, size }) => {
                        return <CustomTab focused={focused} color={color} size={size} route={SettingsScreen}/>
                    }}}/>
                <Tabs.Screen name="Informations" component={InfoScreen} options={{tabBarLabelStyle: {display: "none"}, tabBarIcon: ({ focused, color, size }) => {
                        return <CustomTab focused={focused} color={color} size={size} route={InfoScreen}/>
                    }}}/>
            </Tabs.Navigator>
    );
}


const CustomTab = ({ focused, color, size, route}) => {

    const ref = React.useRef();
    let filePath;
    let stylePath;

    //on focus change the anim will play
    React.useEffect(() => {
        if(focused && ref.current){
            ref.current?.reset();
            ref.current?.play();
        }
    }, [focused, ref.current]);

    switch (route.name) {
        case 'MapScreen':
            filePath = require('../assets/lottie/home.json');
            stylePath = {width: 70, height: 70 }
            break;
        case 'SettingsScreen':
            filePath = require('../assets/lottie/settings.json');
            stylePath = {width: 45, height: 45 }
            break;
        case 'InfoScreen':
            filePath = require('../assets/lottie/info.json');
            stylePath = {width: 70, height: 70}
            break;
    }

    return (
        <LottieView
            ref={ref}
            loop={false}
            source={filePath}
            style={stylePath}
            autoPlay={false} />
    );
};

export default TabNavigator;
