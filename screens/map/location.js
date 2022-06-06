import * as Location from "expo-location";

export const getLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission to access location was denied')
        }

        let location = await Location.getCurrentPositionAsync({})
        return {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        }
    }catch (err){
        console.log("location error", err)
        return null;
    }
}