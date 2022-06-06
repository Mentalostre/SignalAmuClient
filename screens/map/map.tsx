import { ExpoLeaflet, MapMarker} from 'expo-leaflet'
import * as Location from 'expo-location'
import type { LatLngLiteral } from 'leaflet'
import React, { useEffect, useState } from 'react'
import { EventRegister } from 'react-native-event-listeners'

import {
    ActivityIndicator,
    Alert,
    Button, Dimensions, Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { MapLayer } from 'expo-leaflet'
import {getReport, reloadMapReport, setReportInAsyncStorage} from "../../api/report";
import Modal from "react-native-modal";


const mapLayers: Array<MapLayer> = [
    {
        attribution:
            '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        baseLayerIsChecked: true,
        baseLayerName: 'OpenStreetMap',
        layerType: 'TileLayer',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    }
]

const mapOptions = {
    attributionControl: false,
    zoomControl: Platform.OS === 'web',
}

const initialPosition = {
    lat: 43.23205,
    lng: 5.43915,
}


export default function Map() {

    const [zoom, setZoom] = useState(14)
    const [mapCenterPosition, setMapCenterPosition] = useState(initialPosition)
    const [ownPosition, setOwnPosition] = useState<null | LatLngLiteral>(null)
    const [mapMarker, setMapMarker] = useState<null | MapMarker[]>([])

    const [reportDesc, setReportDesc] = useState(null);
    const [reportLvl, setReportLvl] = useState(null);
    const [reportDate, setReportDate] = useState(null);
    const [tagName, setTagName] = useState(null); // pour l'instant c'est tjr le meme je le changerai dans le serveur apres
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [vote, setVote] = useState(null);
    const [reportImage, setReportImage] = useState(null);

    const [isReportPingModalOpen, setIsReportPingModalOpen] = useState(false);




    EventRegister.addEventListener('report', (data)=>{
        let newMapMarker: MapMarker[] = [];
        for(let i =0; i<data.length; i++){
            let d = data[i];
            let marker = getM(d.location_lat, d.location_long, d.id);
            newMapMarker.push(marker);
        }
        setMapMarker(newMapMarker);
    })

    const getM = (lat,long,id)=>{
        let m:MapMarker = {
            id:id,
            position:{lat:lat,lng:long},
            icon: '📍',
            size: [32, 32],
            iconAnchor: [10, 40]
        };
        return m;
    }


    useEffect(() => {
        const getLocationAsync = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                alert('Permission to access location was denied')
            }

            let location = await Location.getCurrentPositionAsync({})
            if (!ownPosition) {
                setOwnPosition({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                })
            }
        }
        getLocationAsync().catch((error) => {
            console.error(error)
        })
    }, [])


    const toggleReportPingModal = () => {
        setIsReportPingModalOpen(!isReportPingModalOpen)
    }

    const resetReportPingModal = () => {
        toggleReportPingModal()

    }

    return (
        <SafeAreaView style={styles.container}>

            <Modal isVisible={isReportPingModalOpen}
                   animationInTiming={400} animationOutTiming={400}
                   deviceHeight={screenHeight} deviceWidth={screenWidth}
                   style={{margin: 0}}
                   onBackdropPress={resetReportPingModal}
                   onSwipeComplete={resetReportPingModal}
                   swipeDirection="down"
            >
                <View style={styles.reportPingModal}>
                    <View style={styles.reportPingModalHeader}>
                        <Image source={require("../../assets/images/reports/vandalism.png")} style={styles.reportPingModalHeaderIcon}></Image>
                        <Text style={styles.reportPingModalHeaderText}>{tagName}</Text>
                        <Text style={styles.reportPingModalLevel}>{"Niveau " + reportLvl}</Text>
                    </View>
                    <View style={styles.reportPingModalContent}>
                        {
                            reportImage &&
                            <Image source={{ uri: reportImage }} style={styles.reportPingModalImage}/>
                        }
                        <Text style={styles.reportPingModalOwner}>{firstName + " " + lastName + " le " + reportDate}</Text>
                        <Text style={styles.reportPingModalDesc}>{reportDesc}</Text>
                    </View>
                    <View style={styles.reportPingModalFooter}>

                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1, position: 'relative' }}>
                <ExpoLeaflet
                    loadingIndicator={() => <ActivityIndicator />}
                    mapCenterPosition={mapCenterPosition}
                    mapLayers={mapLayers}
                    mapOptions={mapOptions}
                    mapMarkers={mapMarker}
                    maxZoom={18}
                    zoom={17}
                    onMessage={(message) => {

                        switch (message.tag) {
                            case "MapReady":
                                reloadMapReport().then(()=> {
                                    return;
                                })
                                break;
                            case 'onMapMarkerClicked':
                                let markerId = message.mapMarkerId;
                                getReport(markerId).then((report)=>{
                                    setReportDate(report.date);
                                    setReportDesc(report.description);
                                    setFirstName(report.first_name);
                                    setLastName(report.last_name);
                                    setReportLvl(report.level);
                                    setTagName(report.tag_name);
                                    setUserEmail(report.user_email);
                                    setVote(report.vote_count);


                                    toggleReportPingModal()
                                });

                                break

                        }
                    }}
                />
            </View>
            <Button
                onPress={async() => {


                }}
                title="Reset Map"
            />

        </SafeAreaView>
    )
}




const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        backgroundColor: 'dodgerblue',
        paddingHorizontal: 10,
        paddingTop: 30,
        width: '100%',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    mapControls: {
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 5,
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: 0,
        marginHorizontal: 10,
        padding: 7,
        position: 'absolute',
        right: 0,
    },
    mapButton: {
        alignItems: 'center',
        height: 42,
        justifyContent: 'center',
        width: 42,
    },
    mapButtonEmoji: {
        fontSize: 28,
    },

    /*  <ReportPingModal>   */
    reportPingModal: {
        height: 2 * screenHeight / 3,
        width: screenWidth - 20,
        borderRadius: 20,
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
    reportPingModalHeader: {
        flexWrap: "wrap",
        flexDirection: "row"
    },
    reportPingModalHeaderText: {
        fontFamily: "Outfit-Bold",
        fontSize: 22,
        lineHeight: 35,
        marginLeft: 20,
    },
    reportPingModalHeaderIcon: {
        marginLeft: 10,
        height: 35,
        width: 35,
    },
    reportPingModalContent: {
        marginTop: 10,
    },
    reportPingModalImage: {
        height: screenHeight/3,
        width: screenWidth - 60,
        resizeMode: "cover",
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#e3e3e3'
    },
    reportPingModalOwner: {
        marginTop: 8,
        fontFamily: "Roboto-Italic",
    },
    reportPingModalLevel: {
        position: "absolute",
        right: 0,
        lineHeight: 35,
        fontFamily: "Outfit-Medium",
    },
    reportPingModalDesc: {
        fontFamily: "Roboto-Medium",
        marginTop: 10,
        fontSize: 16
    },
    reportPingModalFooter: {

    }
    /*  <ReportPingModal/>   */
})
