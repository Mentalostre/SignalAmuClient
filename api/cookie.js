import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSessionCookie = async (cookie) => {
    try {
        const jsonCookie = JSON.stringify(cookie);
        await AsyncStorage.setItem("cookie", jsonCookie);
        console.log("allo : ", jsonCookie);
    } catch (e) {
        console.log("erreur : ", e);
    }
};

export const checkSessionCookie = async () => {
    try {
        const cookie = await AsyncStorage.getItem("cookie");
        return cookie !== null;
    } catch (e) {
        console.log("erreur : ", e);
    }
};