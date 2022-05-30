import AsyncStorage from "@react-native-async-storage/async-storage";

export const disconnect = async () => {
    try {
        await AsyncStorage.removeItem("cookie")
        console.log('disconnected');
    } catch (e) {
        console.log(e);
    }
}