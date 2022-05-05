import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import React, { useState } from "react";
import Apploading from "expo-app-loading";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MapScreen from "./screens/MapScreen";
import DrawerNavigationRoutes from "./screens/DrawerNavigationRoute";
import ReportScreen from "./screens/ReportScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{cardStyle: {backgroundColor: '#FFFFFF'}}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
<<<<<<< HEAD
        options={{
          headerShown: false,
        }}
=======
        options={{ headerShown: false}}
>>>>>>> a8a4261cf72598d60b77bf53cc82724671d8de81
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  return (
    <Stack.Navigator initialRouteName="MapScreen">
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
          title: "Carte",
        }}
      />
      <Stack.Screen
        name="ReportingScreens"
        component={ReportingScreens}
        options={{
          headerShown: true,
          title: "Signalement d'un incident",
        }}
      />
    </Stack.Navigator>
  );
};

const ReportingScreens = () => {
  return (
    <Stack.Navigator initialRouteName="ReportScreen">
      <Stack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerShown: false,
          title: "Signalement d'un incident",
        }}
      />
    </Stack.Navigator>
  );
};

const getFonts = () =>
  Font.loadAsync({
<<<<<<< HEAD
    "Roboto-Black": require("./assets/fonts/Roboto/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("./assets/fonts/Roboto/Roboto-ThinItalic.ttf"),
    "Outfit-Light": require("./assets/fonts/Outfit/Outfit-Light.ttf"),
    "Outfit-Bold": require("./assets/fonts/Outfit/Outfit-Bold.ttf"),
=======
      "Roboto-Black": require("./assets/fonts/Roboto/Roboto-Black.ttf"),
      "Roboto-BlackItalic": require("./assets/fonts/Roboto/Roboto-BlackItalic.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
      "Roboto-BoldItalic": require("./assets/fonts/Roboto/Roboto-BoldItalic.ttf"),
      "Roboto-Italic": require("./assets/fonts/Roboto/Roboto-Italic.ttf"),
      "Roboto-Light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
      "Roboto-LightItalic": require("./assets/fonts/Roboto/Roboto-LightItalic.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
      "Roboto-MediumItalic": require("./assets/fonts/Roboto/Roboto-MediumItalic.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
      "Roboto-Thin": require("./assets/fonts/Roboto/Roboto-Thin.ttf"),
      "Roboto-ThinItalic": require("./assets/fonts/Roboto/Roboto-ThinItalic.ttf"),
      "Outfit-Light": require("./assets/fonts/Outfit/Outfit-Light.ttf"),
      "Outfit-Bold": require("./assets/fonts/Outfit/Outfit-Bold.ttf"),
      "Outfit-Medium": require("./assets/fonts/Outfit/Outfit-Medium.ttf"),
>>>>>>> a8a4261cf72598d60b77bf53cc82724671d8de81
  });

const App = () => {
  const [fontsloaded, setFontsLoaded] = useState(false);

  if (fontsloaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            options={{
              headerShown: false,
            }}
          />
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
};

export default App;
