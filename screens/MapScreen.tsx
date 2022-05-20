import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import * as Location from 'expo-location'
import {map} from "../api/map";
import WebView from "react-native-webview";
import {FadeIn, SlideInDown, SlideOutDown, ZoomIn, ZoomOut} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Modal from "react-native-modal";
import Slider from '@react-native-community/slider';


const MapScreen = ({navigation}) => {

    const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [mapRef, setMapRef] = useState(null);

    //REPORT
    const [reportLevel, setReportLevel] = useState(1)


    const toggleReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen)
    }

    const toggleReportMenu = () => {
        setIsReportMenuOpen(!isReportMenuOpen)
    }

    return (
        <View style={styles.mainArea}>

            <WebView
                ref={(webViewRef) => {
                    setMapRef(webViewRef);
                }}
                source={{html: map}}
                style={styles.mapStyle}

            />


            <View style={styles.logoArea}>
                <TouchableOpacity
                    onPress={() => setIsReportMenuOpen(true)}
                >
                    <Animated.Image
                        source={require("../assets/images/logo.png")}
                        style={styles.reportLogo}
                        entering={FadeIn.delay(400)}
                    />
                </TouchableOpacity>
            </View>
            <Modal isVisible={isReportMenuOpen}
                   animationInTiming={400} animationOutTiming={400}
                   onBackButtonPress={toggleReportMenu}
                   deviceHeight={screenHeight} deviceWidth={screenWidth}
                   style={{ margin: 0 }}
            >
                <View style={styles.reportMenu}>
                    <View style={styles.reports}>
                        <TouchableOpacity onPress={toggleReportModal}>
                            <Image
                                source={require("../assets/images/logo.png")}
                                style={styles.reportIcon}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require("../assets/images/logo.png")}
                            style={styles.reportIcon}
                        />
                        <Image
                            source={require("../assets/images/logo.png")}
                            style={styles.reportIcon}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.closeReportMenuView}
                                  onPress={toggleReportMenu}>
                    <Modal isVisible={isReportModalOpen}
                           animationInTiming={400} animationOutTiming={400}
                           deviceHeight={screenHeight} deviceWidth={screenWidth}
                           style={{ margin: 0 }}
                           onBackdropPress={() => {
                               toggleReportModal()
                               setReportLevel(1)
                    }}
                           onSwipeComplete={() => {
                               toggleReportModal()
                               setReportLevel(1)
                           }}
                           swipeDirection="down"
                    >
                        <View style={styles.reportModalView}>
                            <TouchableOpacity
                                onPress={() => {
                                    toggleReportModal()
                                }}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholderTextColor="#3983cd"
                                    textAlign={"left"}
                                    placeholder="Description"
                                />

                            </TouchableOpacity>
                            <Slider
                                minimumValue={1}
                                maximumValue={5}
                                step={1}
                                style={{width: 200, height: 40}}
                                onValueChange={(value) => {
                                    setReportLevel(value);
                                }}
                            />
                            <Text style={{color: 'white', fontSize: 20}}>{reportLevel}</Text>
                        </View>
                    </Modal>

                    <Text style={styles.closeReportMenu}>
                        FERMER
                    </Text>
                </TouchableOpacity>
            </Modal>

        </View>
    );
};

export default MapScreen;


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    mainArea: {
        flex: 1,
        justifyContent: "flex-end",
    },
    logoArea: {
        position: "absolute",
        alignSelf: "flex-end",
        bottom: 30,
        right: 30,
    },
    reportLogo: {
        height: 70,
        width: 70,
    },
    mapStyle: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    reportMenu: {
        margin: 0,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: 'grey',
        flex: 1,
    },
    closeReportMenu: {
        bottom: 0,
        width: screenWidth,
        borderWidth: 0,
        overflow: 'hidden',
        paddingTop: 16,
        backgroundColor: '#0066CC',
        height: 60,
        fontFamily: "Outfit-Bold",
        fontSize: 18,
        textAlign: "center",
        alignSelf: "center",
        color: "#ffffff",
    },
    closeReportMenuView: {
        alignItems: "flex-start",
    },
    reportIcon: {
        height: 90,
        width: 90,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start"
    },
    reports: {
        paddingTop: 150,
        padding: 50,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        flex: 1,
    },
    reportModalView: {
        height: 1 / 2 * screenHeight,
        width: screenWidth - 20,
        borderRadius: 20,
        padding: 20,
        margin:10,
        backgroundColor: "blue",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textInputStyle: {
        width: screenWidth - 50,
        borderWidth: 0,
        borderRadius: 15,
        padding: 20,
        backgroundColor: '#F3F3F3',
        marginTop: 20,
        height : 60,
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


});
