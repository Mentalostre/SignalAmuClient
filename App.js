import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import { View, Text } from "react-native";

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



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name = "SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Auth" component={Auth} options={{headerShown: false}}/>
        <Stack.Screen name = "DrawerNavigationRoutes" component={DrawerNavigationRoutes} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
