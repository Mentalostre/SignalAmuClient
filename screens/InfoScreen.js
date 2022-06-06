import {
  Image,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useState, useEffect } from "react";
import { handleGetInfo } from "../api/info";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.itemStyle]}>
    <View style={styles.item}>
    <Text style={[styles.infoName]}>
      {item.first_name} {item.last_name}
    </Text>
    <Text style={styles.infoTel}>{item.tel}</Text>
    </View>
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
        onPress={() => console.log(item.info_desc, item.user_email, item.info_email, item.tel)}
      />
    );
  };

  return (

    <View style={styles.mainArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Personnel d'entretien</Text>
      </View>
      <View style={styles.itemList} >
      <FlatList data={info} renderItem={renderItem} />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default InfoScreen;

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
  },
  header:{
    marginTop :65,
    marginLeft : 15,
  },
  headerText:{
    fontFamily: "Outfit-Bold",
    fontSize: 28,
  },
  renderArea: {},
  item:{
    backgroundColor: '#FFFFFF',
    height: 80,
    width: screenWidth - 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 11
  },
  infoName: {
    fontSize: 18,
    fontFamily: "Outfit-Medium",
    textTransform: "capitalize",
    marginLeft: 10
  },
  infoTel: {
    fontFamily: "Roboto-Italic",
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: "#FFE88E",
    alignSelf: 'flex-start',
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 5
  },
  itemStyle: {
    alignItems: 'center',
  },
  itemList: {
    flex: 1

  }

});
