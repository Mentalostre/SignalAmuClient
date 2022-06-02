import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import * as Location from 'expo-location'
import {map} from "../api/map";
import WebView from "react-native-webview";
import Modal from "react-native-modal";
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';


import Map from './map/map'
import {handleReportPost} from "../api/report";

const MapScreen = ({navigation}) => {

    const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [mapRef, setMapRef] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert("You've refused to allow this app to access your location!");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    //REPORT
    const [reportLevel, setReportLevel] = useState(1)
    const [reportTag, setReportTag] = useState("none")
    const [reportDesc, setReportDesc] = useState("")

    const toggleReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen)
    }

    const toggleReportMenu = () => {
        setIsReportMenuOpen(!isReportMenuOpen)
    }

    const [reportImage, setReportImage] = useState(null);

    const resetReport = () => {
        toggleReportModal()
        setReportLevel(1)
        setReportTag("none")
        setReportImage(null)
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");

        } else {
            const result = await ImagePicker.launchCameraAsync();

            if (!result.cancelled) {
                setReportImage(result.uri);
            }

            return result;
        }
    }

    return (
        <View style={styles.mainArea}>

           <Map/>


            <View style={styles.logoArea}>
                <TouchableOpacity
                    onPress={() => setIsReportMenuOpen(true)}
                >
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={styles.reportLogo}

                    />
                </TouchableOpacity>
            </View>
            <Modal isVisible={isReportMenuOpen}
                   animationInTiming={400} animationOutTiming={400}
                   onBackButtonPress={toggleReportMenu}
                   deviceHeight={screenHeight} deviceWidth={screenWidth}
                   style={{margin: 0}}
            >
                <View style={styles.reportMenu}>
                    <View style={styles.reportsFirstRow}>
                        <TouchableOpacity onPress={() => {
                            toggleReportModal();
                            setReportTag("Vandalisme")
                        }}>
                            <Image
                                source={require("../assets/images/reports/vandalism.png")}
                                style={styles.reportIcon}
                            />
                            <Text style={styles.reportName}>Vandalisme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            toggleReportModal();
                            setReportTag("Informatif")
                        }}>
                            <Image
                                source={require("../assets/images/reports/informatif.png")}
                                style={styles.reportIcon}
                            />
                            <Text style={styles.reportName}>Informatif</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            toggleReportModal();
                            setReportTag("Intendance");
                        }}>
                            <Image
                                source={require("../assets/images/reports/intendance.png")}
                                style={styles.reportIcon}
                            />
                            <Text style={styles.reportName}>Intendance</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.reportsSecondRow}>
                        <TouchableOpacity onPress={() => {
                            toggleReportModal();
                            setReportTag("Technique");
                        }}>
                            <Image
                                source={require("../assets/images/reports/technique.png")}
                                style={styles.reportIcon}
                            />
                            <Text style={styles.reportName}>Technique</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            toggleReportModal();
                            setReportTag("Propreté");
                        }}>
                            <Image
                                source={require("../assets/images/reports/proprete.png")}
                                style={styles.reportIcon}
                            />
                            <Text style={styles.reportName}>Propreté</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableOpacity style={styles.closeReportMenuView}
                                  onPress={toggleReportMenu}>
                    <Modal isVisible={isReportModalOpen}
                           animationInTiming={400} animationOutTiming={400}
                           deviceHeight={screenHeight} deviceWidth={screenWidth}
                           style={{margin: 0}}
                           onBackdropPress={resetReport}
                           onSwipeComplete={resetReport}
                           swipeDirection="down"
                    >
                        <KeyboardAvoidingView behavior="padding">
                        <View style={styles.reportModalView}>
                            <TouchableOpacity
                                onPress={() => {
                                    toggleReportModal()
                                }}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholderTextColor="#3983cd"
                                    textAlign={"left"}
                                    textAlignVertical={"top"}
                                    multiline={true}
                                    placeholder="Description"
                                    onChangeText={(reportDesc) => setReportDesc(reportDesc)}
                                />

                            </TouchableOpacity>
                            <View style={styles.reportSlideView}>
                            <Slider
                                minimumValue={1}
                                maximumValue={5}
                                step={1}
                                thumbTintColor={'#0066CC'}
                                minimumTrackTintColor={'#FFCC00'}

                                style={styles.slider}
                                onValueChange={(value) => {
                                    setReportLevel(value);
                                }}
                            />
                                {
                                    !reportImage &&
                                    <TouchableOpacity onPress={openCamera}>
                                        <Image style={styles.reportImage}
                                               source={require("../assets/images/reports/image-plus.png")}/>
                                    </TouchableOpacity>
                                }
                                {
                                    reportImage &&
                                    <TouchableOpacity onPress={() => setReportImage(null)}>
                                        <Image source={require("../assets/images/reports/image-minus.png")}
                                               style={styles.reportImage}/>
                                    </TouchableOpacity>
                                }
                            </View>
                            <Text style={styles.sliderText}>
                                Niveau d'importance : <Text style={styles.primaryColor}>{reportLevel}</Text>
                            </Text>
                            <View style={styles.reportFooter}>


                                <TouchableOpacity onPress={() => {

                                    //handleReportPost(reportDesc,reportLevel,)

                                    console.log(location)
                                    let lat = location.coords.latitude;
                                    let long = location.coords.longitude;
                                    handleReportPost(reportDesc,reportLevel, lat,long, 5).then(
                                        ()=>{
                                            resetReport()
                                            alert("Success")}
                                    ).catch((err)=>{
                                        alert("ERROR")
                                        console.log(err);
                                    });
                                    console.log("Image: "+ reportImage +"\nDesc: "+ reportDesc +"\nTag: "+ reportTag +"\nLevel: "+ reportLevel)

                                }}>
                                    <View style={styles.sendReportTopRadius}>
                                    <Text style={styles.sendReport}>
                                        ENVOYER
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </KeyboardAvoidingView>
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
    primaryColor: {
        color: '#0066CC',
    },
    secondaryColor: {
        color: '#FFCC00',
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
        backgroundColor: '#FFFFFF',
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
        height: ((screenWidth - 50) / 3) - 40,
        width: ((screenWidth - 50) / 3) - 40,
        marginBottom: 10,
    },
    reportsFirstRow: {
        paddingTop: 150,
        padding: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },
    reportsSecondRow: {
        paddingHorizontal: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },

    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        flex: 1,
    },
    reportModalView: {
        height: screenHeight / 2,
        width: screenWidth - 20,
        borderRadius: 20,
        padding: 20,
        margin: 10,
        backgroundColor: "#F3F3F3",
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
        width: screenWidth - 60,
        borderWidth: 0,
        borderRadius: 15,
        padding: 20,
        paddingTop: 20,
        backgroundColor: '#F3F3F3',
        marginTop: 20,
        height: (screenHeight / 3) - 50,
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
    slider: {
        width: screenWidth - 100,
        height: 40,
        marginTop: 8,
    },
    sliderText: {
        color: '#000000FF',
        fontSize: 16,
        marginLeft: 10,
    },
    reportImage: {
        height: 25,
        width: 25,
        marginTop: 15,
        marginRight: 10
    },
    reportFooter: {
        marginTop: 10,
        bottom: 0,
        position: "absolute"
    },
    sendReport: {
        width: screenWidth - 20,
        paddingTop: 16,
        height: 50,
        fontFamily: "Outfit-Bold",
        fontSize: 16,
        textAlign: "center",
        alignSelf: "center",
        color: '#F3F3F3',
    },
    sendReportTopRadius: {
        width: screenWidth - 20,
        height: 50,
        overflow: "hidden",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#0066CC',
    },
    reportName: {
        textAlign: "center",
        fontFamily: "Outfit-Medium"
    },
    reportSlideView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },



});
