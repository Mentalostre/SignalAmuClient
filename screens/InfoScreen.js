import {
  Image,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { handleGetInfo } from "../api/info";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.itemStyle]}>
    <Text style={[styles.infoName]}>
      {item.first_name} {item.last_name}
    </Text>
    <Text style={styles.infoDesc}>{item.info_desc}</Text>
  </TouchableOpacity>
);

const InfoScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [info, setInfo] = useState([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const toggleInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

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

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => console.log(item.tel, item.user_email, item.info_email)}
      />
    );
  };

  return (
    <View style={styles.mainArea}>
      <FlatList data={info} renderItem={renderItem} />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default InfoScreen;

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  renderArea: {},
  infoName: {
    top: 60,
    fontSize: 20,
    fontFamily: "Outfit-Bold",
    paddingBottom: 40,
  },
  infoDesc: {
    marginTop: 20,
    fontFamily: "Roboto-Italic",
  },
  itemStyle: {},
});
