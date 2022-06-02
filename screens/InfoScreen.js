import { Image, View, StyleSheet, Text, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { handleGetInfo } from "../api/info";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InfoScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [info, setInfo] = useState([]);
  /*const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [infoDesc, setInfoDesc] = useState(" ");
  const [phoneNumber, setPhoneNumber] = useState(" ");
  const [email, setEmail] = useState(" ");*/

  const getInfo = async () => {
    try {
      const json = await handleGetInfo();
      const infoJson = json.infos;
      setInfo(infoJson);
    } catch (e) {
      console.log("error : ", e);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  console.log(info);

  return (
    <View style={styles.mainArea}>
      <FlatList
        data={info}
        renderItem={({ item }) => (
          <View style={styles.renderArea}>
            <Text style={styles.infoText}>{item.last_name}</Text>
            <Text style={styles.infoText}>{item.first_name}</Text>
            <Text style={styles.infoText}>{item.user_email}</Text>
            <Text style={styles.infoText}>{item.tel}</Text>
            <Text style={styles.infoText}>{item.info_desc}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  renderArea: {},
  infoText: { top: 40 },
});
