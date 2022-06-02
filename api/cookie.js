import AsyncStorage from "@react-native-async-storage/async-storage";

export const setSessionCookie = async (cookie) => {
    try {
        const jsonCookie = JSON.stringify(cookie).replaceAll("path=/;", "").replaceAll("httponly", "").replaceAll(" ", "").replaceAll(",", "");
        await AsyncStorage.setItem("cookie", jsonCookie);
    } catch (e) {
        console.log("erreur set cookie : ", e);
    }
};

export const getSessionCookie = async () => {
    try {
        return await (await AsyncStorage.getItem("cookie"));
    } catch (e) {
        console.log("erreur get cookie : ", e);
        return null;
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