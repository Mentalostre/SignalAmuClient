import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();

import LottieView from "lottie-react-native";
import SettingsScreen from "../screens/SettingsScreen";
import MapScreen from "../screens/MapScreen";



const TabNavigator = () => {
    return (
            <Tabs.Navigator screenOptions={{headerShown:false}}>
                <Tabs.Screen name="Home" component={MapScreen} />
                <Tabs.Screen name="Settings" component={SettingsScreen} />
            </Tabs.Navigator>
    );
}

export default TabNavigator;

/*
tabBarIcon: ({ focused, color, size }) => {
    return <CustomTab focused={focused} color={color} size={size} route={route}/>
}


const CustomTab = ({ focused, color, size, route}) => {

    const ref = React.useRef();
    let filePath;

    //on focus change the anim will play
    React.useEffect(() => {
        if(focused && ref.current){
            ref.current?.play();
        }
    }, [focused, ref.current]);

    switch (route.name) {
        case 'Home':
            filePath = require('../tabanimations/hometab.json');
            break;
        case 'Messages':
            filePath = require('../tabanimations/messagestab.json');
            break;
        case 'Create':
            filePath = require('../tabanimations/hometab.json');
            break;
        case 'Forum':
            filePath = require('../tabanimations/forumtab.json');
        case 'Profile':
            filePath = require('../tabanimations/profiletab.json');

            break;
    }

    return (
        <LottieView
            ref={ref}
            loop={false}
            source={filePath}
            autoPlay={false} />
    );
};
 */
