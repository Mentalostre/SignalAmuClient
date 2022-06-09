import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import * as Location from 'expo-location'
import Modal from "react-native-modal";
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';



import LottieView from 'lottie-react-native';



import Map from './map/map'
import {handleReportPost, reloadMapReport} from "../api/report";
import {getLocation} from "./map/location";
import io from "socket.io-client";
const SOCKET_URL = "http://localhost:3001"
const MapScreen = ({navigation}) => {

    const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);


    useEffect(() => {
        const socket = io('http://192.168.1.89:3001')
        socket.on("report", async ()=>{
            await reloadMapReport()
        })
    }, []);

    //REPORT
    const [reportLevel, setReportLevel] = useState(1)
    const [reportTag, setReportTag] = useState("none")
    const [reportDesc, setReportDesc] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    const toggleReportModal = () => {
        resetVar();
        setIsReportModalOpen(!isReportModalOpen)
    }

    const resetVar = ()=>{
        setReportImage(null);
        setReportDesc(null);
        setReportLevel(null);
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

    const checkNotEmptyField = ()=>{
        return (reportDesc == null || reportLevel == null);
    }

    const handleReport =async () => {
        if(checkNotEmptyField()) {
            alert("Remplissez tous les champs")
            return;
        }
        setIsLoading(true)
        setIsReportModalOpen(false);
        let location = await getLocation();
        let lat = location.lat;
        let long = location.lng;

        handleReportPost(reportDesc,reportLevel, lat,long, reportTag, reportImage).then(
            (res)=>{
                if(res!=1){
                    alert("Impossible de poster un report")
                    setIsLoading(false)
                }
                else{
                    resetReport()
                    alert("Success")}
                setIsLoading(false)
            }

        ).catch((err)=>{
            alert("ERROR")
            setIsLoading(false)
            console.log('handleReportPost', err);
        });

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
                <TouchableOpacity
                    style={styles.closeReportMenuView}
                    onPress={toggleReportMenu}
                    disabled={isLoading}
                >


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
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholderTextColor="#3983cd"
                                    textAlign={"left"}
                                    textAlignVertical={"top"}
                                    multiline={true}
                                    placeholder="Description"
                                    onChangeText={(reportDesc) => setReportDesc(reportDesc)}
                                    maxLength={255}
                                />
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
                                <PickImage onChange={(imageUri)=>{setReportImage(imageUri)}}/>
                            </View>
                            <Text style={styles.sliderText}>
                                Niveau d'importance : <Text style={styles.primaryColor}>{reportLevel}</Text>
                            </Text>
                            <View style={styles.reportFooter}>
                                <TouchableOpacity onPress={ async () => {
                                    await handleReport();
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
                <LoadingView isLoading={isLoading}/>

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

const PickImage = ({onChange})=>{
    const [isImage, setIsImage] = useState(false)



    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Veuillez accorder l'accès à votre caméra dans les paramètres!");

        } else {
            const result = await ImagePicker.launchCameraAsync();

            if (!result.cancelled) {
                setIsImage(true)
                // @ts-ignore
                onChange(result.uri)

            }

            return result;
        }
    }

    if(isImage){
        return (
            <TouchableOpacity onPress={()=>{setIsImage(false); onChange(null)}}>
                <Image style={styles.reportImage}
                       source={require("../assets/images/reports/image-minus.png")}/>
            </TouchableOpacity>
        )
    }
    else{
        return (
            <TouchableOpacity onPress={openCamera}>
                <Image style={styles.reportImage}
                       source={require("../assets/images/reports/image-plus.png")}/>
            </TouchableOpacity>
        )
    }
}


const loadingViewStyle = StyleSheet.create({
    loadingView: {
        flex:1,
        position:"absolute",
        left:0,
        right:0,
        bottom:0,
        top:0,
        backgroundColor:'rgba(84, 104, 140, 0.5)',
        alignItems:"center",
        justifyContent:"center"
    }
})


const LoadingView = (props)=>{

    if(props.isLoading) return (
        <View style={
            loadingViewStyle.loadingView
        }>
            <LottieView
                source={require('./../assets/lottie/loading.json')}
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'transparent',
                }}
            ></LottieView>
        </View>
    )
    else return null;
}

export {LoadingView}

