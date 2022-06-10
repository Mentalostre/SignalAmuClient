import {
  Image,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import Svg, { SvgProps, Path } from "react-native-svg"


import React, { useState, useEffect } from "react";
import { handleGetInfo } from "../api/info";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.itemStyle]}>
    <View style={styles.item}>
    <Text style={[styles.infoName]}>
      {item.first_name + " " + item.last_name}
    </Text>
    <Text style={styles.infoTel}>{item.tel}</Text>
    </View>
  </TouchableOpacity>
);

const InfoScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [info, setInfo] = useState([]);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

  const [consumerFirstName, setConsumerFirstName] = useState(null)
  const [consumerLastName, setConsumerLastName] = useState(null)
  const [consumerDesc, setConsumerDesc] = useState(null)
  const [consumerEmail, setConsumerEmail] = useState(null)
  const [consumerPhone, setConsumerPhone] = useState(null)
  const [consumerInfo, setConsumerInfo] = useState(null)


  const toggleInformationModal = () => {
    setIsInformationModalOpen(!isInformationModalOpen);
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

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setConsumerFirstName(item.first_name)
          setConsumerLastName(item.last_name)
          setConsumerDesc(item.info_desc)
          setConsumerInfo(item.info_email)
          setConsumerEmail(item.user_email)
          setConsumerPhone(item.tel)
          toggleInformationModal()
        }
      }
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
      <Modal isVisible={isInformationModalOpen}
             animationInTiming={400} animationOutTiming={400}
             deviceHeight={screenHeight} deviceWidth={screenWidth}
             style={{margin: 0}}
             onBackdropPress={toggleInformationModal}
             onSwipeComplete={toggleInformationModal}
             swipeDirection="down"
      >
        <View style={styles.informationModal}>
          <View style={styles.informationModalHeader}>
            <Text style={styles.informationModalHeaderText}>{consumerFirstName + " " + consumerLastName}</Text>
          </View>
          <View style={styles.informationModalContent}>
            <Text style={styles.informationModalDesc}>{consumerDesc}</Text>
            <Text style={styles.informationModalDesc}>{consumerInfo}</Text>
          </View>
          <View style={styles.informationModalFooter}>
            <TouchableOpacity onPress={ () =>
                Linking.openURL(`tel:${consumerPhone}`)
            }>
              <View style={styles.infoButton}>
                <PhoneCall/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () =>
                Linking.openURL(`mailto:${consumerEmail}`)
            }>
              <View style={styles.infoButton}>
                <SendMail/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default InfoScreen;

const PhoneCall = (props: SvgProps) => (
    <Svg
        style={{
          width: 24,
          height: 24,

        }}
        viewBox="0 0 24 24"
        {...props}
    >
      <Path
          fill="#FFFFFF"
          d="M15 12h2a5 5 0 0 0-5-5v2a3 3 0 0 1 3 3m4 0h2c0-5-4.03-9-9-9v2c3.86 0 7 3.13 7 7m1 3.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.25l-2.2 2.2a15.097 15.097 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z"
      />
    </Svg>
)

const SendMail = (props: SvgProps) => (
    <Svg
        style={{
          width: 24,
          height: 24,

        }}
        viewBox="0 0 24 24"
        {...props}
    >
      <Path
          fill="#FFFFFF"
          d="M19.07 13.88 13 19.94V22h2.06l6.06-6.07m1.58-2.35-1.28-1.28a.517.517 0 0 0-.38-.17c-.15.01-.29.06-.39.17l-1 1 2.05 2 1-1c.19-.2.19-.52 0-.72M11 18H4V8l8 5 8-5v2h2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2m9-12-8 5-8-5h16Z"
      />
    </Svg>
)

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
  itemStyle: {
    alignItems: 'center',
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
  itemList: {
    flex: 1

  },

  /*  <informationModal>   */
  informationModal: {
    height: screenHeight / 3,
    width: screenWidth - 20,
    borderRadius: 45,
    padding: 20,
    margin: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  informationModalHeader: {
    marginTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  informationModalHeaderText: {
    fontFamily: "Outfit-Bold",
    fontSize: 22,
    textTransform: "capitalize",
  },
  informationModalContent: {
    marginTop: 10,
  },
  informationModalDesc: {
    fontFamily: "Roboto-Medium",
    marginTop: 10,
    fontSize: 15,
  },
  infoButton: {
    backgroundColor: '#0066CC',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  informationModalFooter: {
    position: "absolute",
    bottom: 10,
    left: screenWidth/2-68,
    flexDirection: "row",

  }

  /*  <informationModal/>   */


});
