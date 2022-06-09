import {Image, View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";

import { handleGetMyInfo } from "../api/myinfo";

const upperCaseFirstLetter = (str) => {
    let result;
    str ? result = str.charAt(0).toUpperCase() + str.slice(1) : null
    return result
}

const SettingsScreen = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
    const [consumerID, setConsumerID] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [infoDesc, setInfoDesc] = useState(null)
    const [infoEmail, setInfoEmail] = useState(null)
    const [phone, setPhone] = useState(null)

    const [data, setData] = useState(null)
    const [dataDesc, setDataDesc] = useState(null)
    const [doubleData, setDoubleData] = useState(null)


    const setInfo = (json) => {
        setConsumerID(json.consumer_id)
        setFirstName(json.first_name)
        setLastName(json.last_name)
        setInfoDesc(json.info_desc)
        setInfoEmail(json.info_email)
        setPhone(json.tel)
    }

    const toggleSettingModalOpen = () => {
        setIsSettingModalOpen(!isSettingModalOpen)
    }


    const getInfo = async () => {
        try {
            const json = await handleGetMyInfo();
            setInfo(json);
        } catch (e) {
            console.log("error : ", e);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

  return (
    <View style={styles.mainArea}>
    <SettingsModal toggleModal={toggleSettingModalOpen} modal={isSettingModalOpen} isConsumer={consumerID}
                   data={data} doubledata={doubleData} dataDesc={dataDesc}/>
      <View style={styles.header}>
        <Text style={styles.headerText}>Paramètres</Text>
        <Text style={styles.welcome}>{"Bienvenue " + upperCaseFirstLetter(firstName) + " " + upperCaseFirstLetter(lastName) + ","}</Text>
      </View>
      <View>
          {
              consumerID? <>
                  <TouchableOpacity onPress={() => {
                      toggleSettingModalOpen()
                      setDoubleData(null)
                      setDataDesc("numéro de téléphone")
                      setData(phone)
                  }}>
                      <Text style={styles.boxText}>Modifier mon numéro de téléphone</Text>
                  </TouchableOpacity>
              </>:null
          }
        <TouchableOpacity onPress={() => {
            navigation.navigate("HomeScreen");
        }}>
            <Text style={styles.boxText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;


const SettingsModal = ({toggleModal, modal, isConsumer, data, dataDesc, doubledata }) => {
    const [dataToSend, setDataToSend] = useState(data)
    return (
        <Modal isVisible={modal}
               animationInTiming={400} animationOutTiming={400}
               deviceHeight={screenHeight} deviceWidth={screenWidth}
               style={{margin: 0}}
               onBackdropPress={toggleModal}
               onSwipeComplete={toggleModal}
               swipeDirection="down"
        >
            <View style={styles.settingsModal}>
                { doubledata?
                    <><View style={styles.settingsModalHeader}>
                        <Text style={styles.settingsModalHeaderText}>{dataDesc}</Text>
                    </View><View style={styles.settingsModalContent}>
                        <Text>{data}</Text>
                        <Text style={styles.settingsModalDesc}>{doubledata}</Text>
                    </View>
                    </>
                    :
                    <>
                    <View style={styles.settingsModalHeader}>
                        <Text style={styles.settingsModalHeaderText}>{"Votre " + dataDesc}</Text>
                    </View><View style={styles.settingsModalContent}>
                        <TextInput
                            style={styles.textInputStyle}
                            textAlign={"left"}
                            maxLength={12}
                            placeholder={data}
                            onChangeText={(newData) => setDataToSend(newData)}
                        />
                    </View><View style={styles.settingsModalFooter}>
                        <TouchableOpacity onPress={
                            () => {
                                console.log(dataToSend)
                            }
                        }>
                            <View style={styles.settingsModalSendView}>
                                <Text style={styles.settingsModalSend}>Mettre à jour</Text>
                            </View>
                        </TouchableOpacity>
                    </View></>
                }

            </View>
        </Modal>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
  },
  header:{
    marginTop :65,
    marginLeft : 15,
    marginBottom: 15,
  },
  headerText:{
    fontFamily: "Outfit-Bold",
    fontSize: 28,
  },
    boxText:{
     height: 56,
     lineHeight: 56,
     fontSize: 18,
     fontFamily: "Outfit-Medium",
     paddingLeft: 10,
     backgroundColor: "#F4F4F4",
     marginBottom: 8,
    },

    /*  <settingsModal>   */
    settingsModal: {
        height: screenHeight / 3,
        width: screenWidth - 20,
        borderRadius: 15,
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
    settingsModalHeader: {
        marginTop: 20,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    settingsModalHeaderText: {
        fontFamily: "Outfit-Bold",
        fontSize: 22,
    },
    settingsModalContent: {
        marginTop: 10,
    },
    settingsModalDesc: {
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
    settingsModalFooter: {
        marginTop: 10,
        bottom: 0,
        position: "absolute"
    },
    settingsModalSend: {
        width: screenWidth - 20,
        paddingTop: 16,
        height: 50,
        fontFamily: "Outfit-Bold",
        fontSize: 16,
        textAlign: "center",
        alignSelf: "center",
        color: '#F3F3F3',
    },
    settingsModalSendView: {
        width: screenWidth - 20,
        height: 50,
        overflow: "hidden",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#0066CC',
    },
    textInputStyle: {
        width: screenWidth - 60,
        borderWidth: 0,
        borderRadius: 15,
        padding: 20,
        paddingTop: 20,
        backgroundColor: '#F3F3F3',
        marginTop: 20,
        fontFamily: "Outfit-Medium",
        fontSize: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    /*  <settingsModal/>   */
    welcome: {
        marginTop: 20,
        marginBottom: 15,
        fontSize: 18,
        fontFamily: "Outfit-Medium"
    },


});
