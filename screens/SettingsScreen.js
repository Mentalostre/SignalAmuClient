import {Image, View, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

const SettingsScreen = ({navigation}) => {
    return (
        <View style={styles.mainArea}>
            <View style={styles.logoArea}>
                <TouchableOpacity>
                    <Image
                        source={require("../assets/images/handphone.png")}
                        style={styles.reportLogo}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen

const styles = StyleSheet.create({
    mainArea: {
        flex: 1,
        justifyContent: "flex-end",
    },
    logoArea: {
        alignSelf: "flex-end",
        bottom: 50,
        right: 50,
    },
    reportLogo: {
        height: 90,
        width: 90,
    },
})
