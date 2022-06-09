import { ExpoLeaflet, MapMarker} from 'expo-leaflet'
import * as Location from 'expo-location'
import type { LatLngLiteral } from 'leaflet'
import React, { useEffect, useState } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import Svg, { SvgProps, Path } from "react-native-svg"

import {
    ActivityIndicator,
    Alert, Button,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { MapLayer } from 'expo-leaflet'
import {getReport, reloadMapReport, reloadMapReportStorage, setReportInAsyncStorage} from "../../api/report";
import Modal from "react-native-modal";
import {request_encoded_post, request_get} from "../../api/request";
import {LoadingView} from "../MapScreen";


const mapLayers: Array<MapLayer> = [
    {
        attribution:
            '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        baseLayerIsChecked: true,
        baseLayerName: 'OpenStreetMap',
        layerType: 'TileLayer',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    {
        baseLayerIsChecked: true,
        baseLayer: true,
        baseLayerName: 'Mapbox',
        layerType: 'TileLayer',
        url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9obmtvbmRvIiwiYSI6ImNsM3lpMmN0OTBpb3MzZGpqMnM4ZWNmaHcifQ.E3xd9GKzNR_h8zO1vJpYKg`,
    },

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
    const [tagName, setTagName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [vote, setVote] = useState(null);
    const [reportImage, setReportImage] = useState(null);
    const [reportTagImage, setReportTagImage] = useState(null);
    const [reportId, setReportId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReportPingModalOpen, setIsReportPingModalOpen] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);


    EventRegister.addEventListener('report', (data)=>{
        let newMapMarker: MapMarker[] = [];
        for(let i =0; i<data.length; i++){
            let d = data[i];
            let marker = getM(d.location_lat, d.location_long, d.id, pingIcon(d.tag_name));
            newMapMarker.push(marker);
        }
        setMapMarker(newMapMarker);
    })

    const getM = (lat,long,id, icon)=>{
        let m:MapMarker = {
            id:id,
            position:{lat:lat,lng:long},
            icon: icon,
            size: [32, 32],
            iconAnchor: [0, 32]
        };
        return m;
    }

    const pingIcon = (tag_name) =>{
        switch (tag_name){
            case "Vandalisme" :
                return "https://i.imgur.com/92PjlaV.png"
            case "Technique" :
                return "https://i.imgur.com/6HshbJd.png"
            case "Propreté" :
                return "https://i.imgur.com/yMTkisa.png"
            case "Intendance" :
                return "https://i.imgur.com/11N60dL.png"
            case "Informatif" :
                return "https://i.imgur.com/0LqDPVb.png"
            default :
                return "https://i.imgur.com/92PjlaV.png"
        }
    }


    const pickReportTagImage = (tag_name) => {
        switch (tag_name){
            case "Vandalisme" :
                setReportTagImage(require('../../assets/images/reports/vandalism.png'))
                break
            case "Technique" :
                setReportTagImage(require('../../assets/images/reports/technique.png'))
                break
            case "Propreté" :
                setReportTagImage(require('../../assets/images/reports/proprete.png'))
                break
            case "Intendance" :
                setReportTagImage(require('../../assets/images/reports/intendance.png'))
                break
            case "Informatif" :
                setReportTagImage(require('../../assets/images/reports/informatif.png'))
                break
            default :
                setReportTagImage(require('../../assets/images/reports/vandalism.png'))
                break
        }
    }

    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
]

    const formatDate = (date) => {
        const month = +new Date(date).toLocaleDateString().slice(0,2)
        return new Date(date).toLocaleDateString().slice(3,5) + " " + monthNames[month-1] + " 20" + new Date(date).toLocaleDateString().slice(6,8)
    }

    const upperCaseFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
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

    const processVote = async (voteValue)=>{
        if(hasVoted) return;
        setHasVoted(true);
        let data = {
            report_id: reportId,
            vote_value:  voteValue
        }
        let result = await request_encoded_post(data, '/api/vote');
        if(result.res == 1){
            setIsLoading(true);
            await reloadMapReportStorage()
            getReport(reportId).then((report)=>{
                setVote(report.vote_count);
            })
            setIsLoading(false);
        }
        return;
    }

    const getImage = (reportId)=>{
        request_get('/api/report/image/' + reportId).then((response)=>{
            if(response.res ==1){
                if(response.images_name.length != 0){
                    let imageNames = response.images_name[0]
                    console.log(imageNames)
                    setReportImage('http://192.168.1.89:3000/api/image/upload/' + imageNames);
                }
                else{return;}
            }
        })
    }

    return (
        <View style={styles.container}>

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
                        <Image source={reportTagImage} style={styles.reportPingModalHeaderIcon}/>

                        <Text style={styles.reportPingModalHeaderText}>{tagName}</Text>
                        <Text style={styles.reportPingModalLevel}>{"Niveau " + reportLvl}</Text>
                    </View>
                    <View style={styles.reportPingModalContent}>
                        {
                            reportImage &&
                            <Image source={{ uri: reportImage }}  style={styles.reportPingModalImage}/>
                        }
                        <Text style={styles.reportPingModalOwner}>{firstName + " " + lastName + " le " + reportDate}</Text>
                        <Text style={styles.reportPingModalDesc}>{reportDesc}</Text>
                    </View>
                    <View style={styles.reportPingModalFooter}>
                        <TouchableOpacity onPress={async () =>{await processVote(1)}}>
                            <UpVote></UpVote>
                        </TouchableOpacity>
                        <Text style={styles.reportVoteCount}>{vote}</Text>
                        <TouchableOpacity onPress={async () =>{await processVote(0)}} >
                            <DownVote></DownVote>
                        </TouchableOpacity>
                    </View>
                </View>
                <LoadingView isLoading={isLoading}/>

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
                                    setReportImage(null);
                                    pickReportTagImage(report.tag_name);
                                    setReportDate(formatDate(+report.date));
                                    setReportDesc(upperCaseFirstLetter(report.description));
                                    setFirstName(upperCaseFirstLetter(report.first_name));
                                    setLastName(upperCaseFirstLetter(report.last_name));
                                    setReportLvl(report.level);
                                    setTagName(report.tag_name);
                                    setUserEmail(report.user_email);
                                    setVote(report.vote_count);
                                    setReportId(markerId);
                                    getImage(markerId);
                                    setHasVoted(false);
                                    toggleReportPingModal()
                                });

                                break

                        }
                    }}
                />
            </View>
        </View>
    )
}

const processUpVote = ()=>{

}



const UpVote = (props: SvgProps) => (
    <Svg
        style={{
            width: 24,
            height: 24,
        }}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill="#0066CC"
            d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2M1 21h4V9H1v12Z"
        />

    </Svg>
)

const DownVote = (props: SvgProps) => (
    <Svg
        style={{
            width: 24,
            height: 24,
        }}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill="#0066CC"
            d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
        />

    </Svg>
)


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
        fontSize: 15,
    },
    reportPingModalFooter: {
        position: "absolute",
        bottom: 10,
        right: 15,
        flexDirection: "row",
    },
    reportVoteCount: {
        marginHorizontal: 10
    },
    /*  <ReportPingModal/>   */

})
