import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import React, { useState } from "react";
import Apploading from "expo-app-loading";


import SplashScreen from './screens/SplashScreen'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import DrawerNavigationRoutes from "./screens/DrawerNavigationRoute";


const Stack = createStackNavigator();


const Auth = () => {
  return(
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name ="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name ="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

const getFonts = () =>
    Font.loadAsync({
        'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
        'Roboto-BlackItalic': require('./assets/fonts/Roboto/Roboto-BlackItalic.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        'Roboto-BoldItalic': require('./assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
        'Roboto-Italic': require('./assets/fonts/Roboto/Roboto-Italic.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
        'Roboto-LightItalic': require('./assets/fonts/Roboto/Roboto-LightItalic.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Roboto-MediumItalic': require('./assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Thin': require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
        'Roboto-ThinItalic': require('./assets/fonts/Roboto/Roboto-ThinItalic.ttf'),
    });


const App = () => {
    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen">
                    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
                    <Stack.Screen name="DrawerNavigationRoutes" component={DrawerNavigationRoutes}
                                  options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <Apploading
                startAsync={getFonts}
                onFinish={() => {
                    setFontsLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}

export default App;
