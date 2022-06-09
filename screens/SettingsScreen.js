import {Image, View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";

import { handleGetMyInfo } from "../api/myinfo";


const SettingsScreen = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [info, setInfo] = useState([]);
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);


    const toggleSettingModalOpen = () => {
        setIsSettingModalOpen(!isSettingModalOpen)
    }

    const getInfo = async () => {
        try {
            const json = await handleGetMyInfo();
            setInfo(json);
            console.log(json)
        } catch (e) {
            console.log("error : ", e);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

  return (
    <View style={styles.mainArea}>
        <SettingsModal toggleModal={toggleSettingModalOpen} modal={isSettingModalOpen} isConsumer={null}/>
      <View style={styles.header}>
        <Text style={styles.headerText}>Paramètres</Text>
      </View>
      <View>
        <TouchableOpacity onPress={toggleSettingModalOpen}>
                <Text style={styles.boxText}>Ne fait rien</Text>
        </TouchableOpacity>
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


const SettingsModal = ({toggleModal, modal, isConsumer}) => {

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
                { isConsumer &&
                    <><View style={styles.settingsModalHeader}>
                        <Text style={styles.settingsModalHeaderText}>Coucou</Text>
                    </View><View style={styles.settingsModalContent}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholderTextColor="#3983cd"
                            textAlign={"left"}
                            textAlignVertical={"top"}
                            multiline={true}
                            placeholder="Description"
                            maxLength={255}/>
                        <Text style={styles.settingsModalDesc}>Tocard</Text>
                    </View><View style={styles.settingsModalFooter}>
                        <TouchableOpacity>
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
     backgroundColor: "#F4F4F4"
    },

    /*  <settingsModal>   */
    settingsModal: {
        height: 2 * screenHeight / 3,
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
        textTransform: "capitalize",
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
        height: (screenHeight / 4),
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


});
